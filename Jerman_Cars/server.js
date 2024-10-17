const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

const supabaseUrl = 'supabase-project-url'; // Replace with your Supabase project URL
const supabaseKey = 'supabase-anon-key'; // Replace with your Supabase anon key
const supabase = createClient(supabaseUrl, supabaseKey);

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const { user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(401).json({ error: error.message });
  }

  res.status(200).json({ message: 'Login successful', user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
