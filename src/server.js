import "dotenv/config";
import { app } from "./app.js";
import { sequelize } from "./config/db.js";
import "./models/index.js";

const PORT = process.env.PORT || 4000;

async function main() {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connected");

    await sequelize.sync({ alter: true });
    console.log("✅ DB synced");

    app.listen(PORT, () => {
      console.log(`🚀 API running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Startup error:", err);
    process.exit(1);
  }
}

main();
