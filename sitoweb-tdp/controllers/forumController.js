const ForumPost = require("../models/ForumPost");
const Comment = require("../models/Comment");

// LISTA TUTTI I POST
exports.list = async (req, res) => {
  try {
    const posts = await ForumPost.find()
      .populate("author", "username")
      .sort({ createdAt: -1 });
    res.render("forum/list", { posts, currentUser: req.user });
  } catch (err) {
    res.status(500).send("Errore nel recupero dei post.");
  }
};

// FORM NUOVO POST
exports.newForm = (req, res) => {
  res.render("forum/new");
};

// CREA UN NUOVO POST
exports.create = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    if (!title || !content) {
      return res.status(400).send("Titolo e contenuto sono obbligatori.");
    }

    await ForumPost.create({
      title,
      content,
      category,
      author: req.user._id,
    });
    res.redirect("/forum");
  } catch (err) {
    res.status(500).send("Errore nella creazione del post.");
  }
};

// MOSTRA UN POST CON I COMMENTI
exports.show = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id)
      .populate("author", "username")
      .populate({
        path: "comments",
        populate: { path: "author", select: "username" },
      });

    if (!post) return res.status(404).send("Post non trovato");

    res.render("forum/show", { post, currentUser: req.user });
  } catch (err) {
    res.status(500).send("Errore nel recupero del post.");
  }
};

// FORM MODIFICA
exports.editForm = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);
    if (!post) return res.status(404).send("Post non trovato");
    if (!post.author.equals(req.user._id))
      return res.status(403).send("Non autorizzato");

    res.render("forum/edit", { post });
  } catch (err) {
    res.status(500).send("Errore nel recupero del post.");
  }
};

// AGGIORNA IL POST
exports.update = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const post = await ForumPost.findById(req.params.id);
    if (!post) return res.status(404).send("Post non trovato");
    if (!post.author.equals(req.user._id))
      return res.status(403).send("Non autorizzato");

    post.title = title;
    post.content = content;
    post.category = category;
    post.updatedAt = new Date();
    await post.save();

    res.redirect(`/forum/${post._id}`);
  } catch (err) {
    res.status(500).send("Errore nell'aggiornamento del post.");
  }
};

// ELIMINA IL POST
exports.delete = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);
    if (!post) return res.status(404).send("Post non trovato");
    if (!post.author.equals(req.user._id))
      return res.status(403).send("Non autorizzato");

    await ForumPost.findByIdAndDelete(req.params.id);
    res.redirect("/forum");
  } catch (err) {
    res.status(500).send("Errore nell'eliminazione del post.");
  }
};

// AGGIUNGI COMMENTO
exports.comment = async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);
    if (!post) return res.status(404).send("Post non trovato");

    if (!req.body.content) {
      return res.status(400).send("Il commento non può essere vuoto.");
    }

    const comment = await Comment.create({
      content: req.body.content,
      author: req.user._id,
    });

    post.comments.push(comment._id);
    await post.save();

    res.redirect(`/forum/${post._id}`);
  } catch (err) {
    res.status(500).send("Errore nell'aggiunta del commento.");
  }
};
