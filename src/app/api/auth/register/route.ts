import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

// Path to store user data
const USERS_FILE_PATH = path.join(process.cwd(), 'src', 'app', 'data', 'users.json');

// Initialize users file if it doesn't exist
if (!fs.existsSync(USERS_FILE_PATH)) {
  const initialUsers = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      image: "https://placehold.co/60x60/0f172a/white?text=JD",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      password: "password123",
      image: "https://placehold.co/60x60/0f172a/white?text=JS",
    },
  ];
  
  // Create data directory if it doesn't exist
  const dataDir = path.dirname(USERS_FILE_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(initialUsers, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // Validation
    if (!name || !email || !password) {
      return Response.json(
        { message: 'Missing required fields: name, email, or password' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Read existing users
    const usersData = fs.readFileSync(USERS_FILE_PATH, 'utf8');
    let users = JSON.parse(usersData);

    // Check if user already exists
    const existingUser = users.find((user: any) => user.email === email);
    if (existingUser) {
      return Response.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // In a real application, you would hash the password here
    // For this demo, we'll store it as-is (not secure!)
    
    // Generate a simple ID (in production, use a proper UUID generator)
    const newId = String(Math.max(...users.map((user: any) => parseInt(user.id)), 0) + 1);
    
    // Create a placeholder image URL based on the user's initials
    const initials = name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
    const imageUrl = `https://placehold.co/60x60/0f172a/white?text=${initials}`;

    // Add new user to the users array
    const newUser = {
      id: newId,
      name,
      email,
      password, // In production, store hashed password
      image: imageUrl,
    };
    
    users.push(newUser);

    // Write updated users back to file
    fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(users, null, 2));

    return Response.json(
      { 
        message: 'User registered successfully',
        user: {
          id: newId,
          name,
          email,
          image: imageUrl,
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return Response.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}