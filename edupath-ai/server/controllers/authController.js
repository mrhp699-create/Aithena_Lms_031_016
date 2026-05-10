import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const signToken = id => jwt.sign({ id }, process.env.JWT_SECRET || 'edupath_ai_secret_key', { expiresIn: '30d' });
const serialize = user => ({ _id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar, createdAt: user.createdAt });

export const register = async (req, res) => {
  const { name, email, password, role = 'student' } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email already registered' });
  const user = await User.create({ name, email, password, role });
  res.status(201).json({ user: serialize(user), token: signToken(user._id) });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) return res.status(401).json({ message: 'Invalid email or password' });
  res.json({ user: serialize(user), token: signToken(user._id) });
};

export const me = async (req, res) => res.json({ user: req.user });
