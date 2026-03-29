/**
 * Livion Interiors — Admin Password Reset Script
 * 
 * Run this to generate a new password hash and update the admin user.
 * 
 * Usage:
 *   node scripts/reset-admin-password.js
 * 
 * Then copy the output SQL and run it in your PostgreSQL database.
 */

const bcrypt = require("bcryptjs");
const readline = require("readline");

const rl = readline.createInterface({
  input:  process.stdin,
  output: process.stdout,
});

rl.question("Enter new admin username (default: admin): ", (username) => {
  const finalUsername = username.trim() || "admin";

  rl.question("Enter new password: ", async (password) => {
    if (password.length < 8) {
      console.log("❌ Password must be at least 8 characters.");
      rl.close();
      return;
    }

    const hash = await bcrypt.hash(password, 10);

    console.log("\n✅ Password hashed successfully!\n");
    console.log("Run this SQL in your PostgreSQL database:\n");
    console.log("─".repeat(60));
    console.log(`-- Option 1: Update existing admin`);
    console.log(`UPDATE admin_users SET username = '${finalUsername}', password_hash = '${hash}' WHERE username = 'admin';`);
    console.log(`\n-- Option 2: Insert new admin (if table is empty)`);
    console.log(`INSERT INTO admin_users (username, password_hash) VALUES ('${finalUsername}', '${hash}');`);
    console.log("─".repeat(60));
    console.log(`\nUsername: ${finalUsername}`);
    console.log(`Password: ${password}`);
    console.log("\n⚠️  Save these credentials somewhere safe. Do not share them.");

    rl.close();
  });
});
