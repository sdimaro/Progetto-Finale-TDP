// Dati temporanei in memoria (mock)
let healthTopics = [
  {
    id: 1,
    title: "Alimentazione sana",
    description: "Mangiare equilibrato per stare meglio.",
  },
  {
    id: 2,
    title: "Attività fisica",
    description: "Muoversi ogni giorno migliora la salute.",
  },
];

let nextId = 3;

// LIST - Mostra tutti gli argomenti
exports.list = (req, res) => {
  res.render("health/list", { topics: healthTopics });
};

// NEW FORM - Mostra il form per aggiungere un nuovo argomento
exports.newForm = (req, res) => {
  res.render("health/new");
};

// CREATE - Salva un nuovo argomento
exports.create = (req, res) => {
  const { title, description } = req.body;
  healthTopics.push({ id: nextId++, title, description });
  res.redirect("/health");
};

// SHOW - Mostra i dettagli di un argomento
exports.show = (req, res) => {
  const topic = healthTopics.find((t) => t.id == req.params.id);
  if (!topic) return res.status(404).send("Argomento non trovato");
  res.render("health/show", { topic });
};

// EDIT FORM - Mostra il form per modificare un argomento
exports.editForm = (req, res) => {
  const topic = healthTopics.find((t) => t.id == req.params.id);
  if (!topic) return res.status(404).send("Argomento non trovato");
  res.render("health/edit", { topic });
};

// UPDATE - Aggiorna un argomento
exports.update = (req, res) => {
  const topic = healthTopics.find((t) => t.id == req.params.id);
  if (!topic) return res.status(404).send("Argomento non trovato");

  const { title, description } = req.body;
  topic.title = title;
  topic.description = description;

  res.redirect("/health");
};

// DELETE - Elimina un argomento
exports.delete = (req, res) => {
  healthTopics = healthTopics.filter((t) => t.id != req.params.id);
  res.redirect("/health");
};
