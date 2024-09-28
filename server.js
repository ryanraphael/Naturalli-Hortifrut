const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ryanraphaelsantos6:<gWSykpopXVqmSsT6>@cluster0.b6o7n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Crie um cliente MongoClient com opções
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Conecte o cliente ao servidor
    await client.connect();
    // Envie um ping para confirmar uma conexão bem-sucedida
    await client.db("admin").command({ ping: 1 });
    console.log("Pingou sua implantação. Você se conectou com sucesso ao MongoDB!");
  } catch (error) {
    console.error("Erro na conexão com MongoDB:", error);
  } finally {
    // Garante que o cliente será fechado quando você terminar/erro
    await client.close();
  }
}

run().catch(console.dir);
