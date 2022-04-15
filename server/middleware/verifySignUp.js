export default async function verifySignUp(req, res) {
    try {
      const { name, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await pool.query(
        "INSERT INTO users (uname, pword) VALUES ($1, $2) RETURNING *",
        [name, hashedPassword]
      );
      res.json(newUser.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
}