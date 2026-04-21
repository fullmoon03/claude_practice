import { Request, Response } from 'express';
import prisma from '../models/prisma';
import { Priority } from '@prisma/client';

export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const { completed, priority, categoryId, search, sortBy = 'createdAt', order = 'desc' } = req.query;

    const where: any = {};

    if (completed !== undefined) {
      where.completed = completed === 'true';
    }

    if (priority) {
      where.priority = priority as Priority;
    }

    if (categoryId) {
      where.categoryId = categoryId as string;
    }

    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } }
      ];
    }

    const todos = await prisma.todo.findMany({
      where,
      include: {
        category: true
      },
      orderBy: {
        [sortBy as string]: order as 'asc' | 'desc'
      }
    });

    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
};

export const getTodoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await prisma.todo.findUnique({
      where: { id },
      include: { category: true }
    });

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todo' });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description, priority, dueDate, categoryId } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        priority: priority || 'MEDIUM',
        dueDate: dueDate ? new Date(dueDate) : null,
        categoryId: categoryId || null
      },
      include: { category: true }
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, completed, priority, dueDate, categoryId } = req.body;

    const updateData: any = {};

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (completed !== undefined) updateData.completed = completed;
    if (priority !== undefined) updateData.priority = priority;
    if (dueDate !== undefined) updateData.dueDate = dueDate ? new Date(dueDate) : null;
    if (categoryId !== undefined) updateData.categoryId = categoryId;

    const todo = await prisma.todo.update({
      where: { id },
      data: updateData,
      include: { category: true }
    });

    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.todo.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
};
