import { Request, Response } from 'express';
import Category from '../models/Category';

export const getCategories = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const categories = await Category.find()
            .populate('parent', 'name slug')
            .sort('name');

        return res.json(categories);
    } catch (error) {
        console.error('Get categories error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getCategory = async (req: Request, res: Response): Promise<Response> => {
    try {
        const category = await Category.findOne({ slug: req.params.slug })
            .populate('parent', 'name slug');

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        return res.json(category);
    } catch (error) {
        console.error('Get category error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const createCategory = async (req: Request, res: Response): Promise<Response> => {
    try {
        const category = await Category.create(req.body);
        return res.status(201).json(category);
    } catch (error) {
        console.error('Create category error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateCategory = async (req: Request, res: Response): Promise<Response> => {
    try {
        const category = await Category.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true, runValidators: true }
        );

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        return res.json(category);
    } catch (error) {
        console.error('Update category error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteCategory = async (req: Request, res: Response): Promise<Response> => {
    try {
        const category = await Category.findOneAndDelete({ slug: req.params.slug });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        return res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Delete category error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};