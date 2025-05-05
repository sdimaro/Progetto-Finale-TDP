const ForumPost = require("../models/ForumPost");
const Comment = require("../models/Comment");

// LISTA TUTTI I POST
exports.list = async (req, res) => {
  try {
    const posts = await ForumPost.find()
      .populate({
        path: "author",
        select: "username _id", // Assicurati di includere _id
      })
      .sort({ createdAt: -1 });

    res.render("forum/list", { posts });
  } catch (err) {
    console.error("Errore nel recupero dei post:", err);
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
    console.log("Dati sessione:", req.session);
    console.log("Dati body:", req.body);

    const { title, content, category } = req.body;
    if (!title || !content) {
      return res.status(400).send("Titolo e contenuto sono obbligatori.");
    }

    const newPost = await ForumPost.create({
      title,
      content,
      category,
      author: req.session.userId,
    });

    console.log("Nuovo post creato:", newPost);
    res.redirect("/forum");
  } catch (err) {
    console.error("Errore nella creazione del post:", err);
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
    const topic = await ForumPost.findById(req.params.id);

    if (!topic) {
      return res.status(404).send("Argomento non trovato");
    }

    const authorId = topic.author.toString();
    const currentUserId = req.user?._id.toString() || req.session.userId;
    if (authorId !== currentUserId) {
      return res.status(403).send("Non autorizzato");
    }

    res.render("forum/edit", { topic });
  } catch (err) {
    console.error("Errore nel recupero dell'argomento per edit:", err);
    res.status(500).send("Errore nel recupero dell'argomento.");
  }
};
// MODIFICA POST
exports.update = async (req, res) => {
  try {
    // Log iniziali per debug
    console.log(">>> update chiamata");
    console.log(">>> req.session.userId =", req.session.userId);
    console.log(">>> req.user =", req.user);
    console.log(">>> req.body =", req.body);

    const userId = req.user._id; // l'autore deve essere loggato
    const { title, content, category } = req.body;

    // aggiorna SOLO se author===userId
    const updatedPost = await ForumPost.findOneAndUpdate(
      { _id: req.params.id, author: userId },
      { title, content, category, updatedAt: Date.now() },
      { new: true }
    );

    console.log(">>> update: risultato findOneAndUpdate =", updatedPost);

    if (!updatedPost) {
      return res.status(403).send("Non autorizzato o post non trovato");
    }
    res.redirect(`/forum/${updatedPost._id}`);
  } catch (err) {
    console.error("Errore nell'aggiornamento del post:", err);
    res.status(500).send("Errore nell'aggiornamento del post.");
  }
};

// ELIMINA DEL POST
exports.delete = async (req, res) => {
  try {
    const userId = req.user._id;

    const post = await ForumPost.findOneAndDelete({
      _id: req.params.id,
      author: userId,
    });

    if (!post) {
      return res.status(403).send("Non autorizzato o post non trovato");
    }
    res.redirect("/forum");
  } catch (err) {
    console.error("Errore nell'eliminazione del post:", err);
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
