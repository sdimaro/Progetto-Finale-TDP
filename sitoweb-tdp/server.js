const app = require("./app");

app.get("/", (req, res) => {
  res.render("home");
});

// Porta su cui il server ascolta
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
