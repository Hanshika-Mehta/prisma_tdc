const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());


// GET /users
app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany();
  
    res.status(200).json({ users });
  });
// POST /users
app.post('/users', async (req, res) => {
    const id = req.params.id;

    try {
      await prisma.user.delete({
        where: {
          customer_id: Number(id)
        }
      });
    
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});


// GET /movies
app.get('/movies', async (req, res) => {
    const movies = await prisma.movie.findMany();
  
    res.status(200).json({ movies });
  });
// POST /movies
app.post('/movies', async (req, res) => {
  const { movie_name, duration, screens, release_date } = req.body;

  try {
    const newMovie = await prisma.movie.create({
      data: {
        movie_name,
        duration,
        screens,
        release_date: new Date(release_date),
      },
    });

    res.status(201).json({ movie: newMovie });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// GET /bookings
app.get('/bookings', async (req, res) => {
    const bookings = await prisma.booking.findMany();
  
    res.status(200).json({ bookings });
  });
  
// POST /bookings
app.post('/bookings', async (req, res) => {
  const { movieId, userId, price } = req.body;

  try {
    const newBooking = await prisma.booking.create({
      data: {
        movieId,
        userId,
        price,
      },
    });

    res.status(201).json({ booking: newBooking });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      await prisma.user.delete({
        where: {
          customer_id: id
        }
      });
  
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});