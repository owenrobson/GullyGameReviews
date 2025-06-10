import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { useReviews } from '@/hooks/useReviews';
import { GameReview } from '@/data/gameReviews';

interface CMSDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CMSDialog: React.FC<CMSDialogProps> = ({ open, onOpenChange }) => {
  const { reviews, addReview, updateReview, deleteReview } = useReviews();
  const [editingReview, setEditingReview] = useState<GameReview | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    game: '',
    platform: 'PS5',
    rating: 8.0,
    excerpt: '',
    content: '',
    author: '',
    category: 'Action',
    readTime: '10 min read',
    date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
    pros: [''],
    cons: ['']
  });

  const resetForm = () => {
    setFormData({
      title: '',
      game: '',
      platform: 'PS5',
      rating: 8.0,
      excerpt: '',
      content: '',
      author: '',
      category: 'Action',
      readTime: '10 min read',
      date: new Date().toISOString().split('T')[0], // Reset to today's date
      image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      pros: [''],
      cons: ['']
    });
    setEditingReview(null);
    setShowForm(false);
  };

  const handleEdit = (review: GameReview) => {
    setFormData({
      title: review.title,
      game: review.game,
      platform: review.platform,
      rating: review.rating,
      excerpt: review.excerpt,
      content: review.content,
      author: review.author,
      category: review.category,
      readTime: review.readTime,
      date: review.date,
      image: review.image,
      featured: review.featured,
      pros: review.pros,
      cons: review.cons
    });
    setEditingReview(review);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const reviewData = {
      ...formData,
      pros: formData.pros.filter(pro => pro.trim() !== ''),
      cons: formData.cons.filter(con => con.trim() !== '')
    };

    if (editingReview) {
      updateReview(editingReview.id, reviewData);
    } else {
      addReview(reviewData);
    }

    resetForm();
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this review?')) {
      deleteReview(id);
    }
  };

  const updateProsOrCons = (type: 'pros' | 'cons', index: number, value: string) => {
    const updated = [...formData[type]];
    updated[index] = value;
    setFormData({ ...formData, [type]: updated });
  };

  const addProOrCon = (type: 'pros' | 'cons') => {
    setFormData({ ...formData, [type]: [...formData[type], ''] });
  };

  const removeProOrCon = (type: 'pros' | 'cons', index: number) => {
    const updated = formData[type].filter((_, i) => i !== index);
    setFormData({ ...formData, [type]: updated });
  };

  const handleDialogClose = () => {
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Content Management System</DialogTitle>
          <DialogDescription>
            Manage your game reviews - create, edit, and delete reviews.
          </DialogDescription>
        </DialogHeader>

        {!showForm ? (
          <div className="space-y-6">
            <Button onClick={() => setShowForm(true)} className="w-full h-12 text-base">
              <Plus className="h-5 w-5 mr-2" />
              Add New Review
            </Button>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              <h3 className="font-semibold text-lg">Existing Reviews ({reviews.length})</h3>
              {reviews.map((review) => (
                <div key={review.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">{review.title}</h4>
                    <p className="text-sm text-slate-600">{review.game} - {review.platform}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{review.category}</span>
                      <span className="text-xs text-slate-500">Rating: {review.rating}/10</span>
                      <span className="text-xs text-slate-500">Date: {new Date(review.date).toLocaleDateString()}</span>
                      {review.featured && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Featured</span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(review)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(review.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {reviews.length === 0 && (
                <p className="text-center text-slate-500 py-8">No reviews yet. Create your first review!</p>
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                {editingReview ? 'Edit Review' : 'Create New Review'}
              </h3>
              <Button type="button" variant="ghost" size="sm" onClick={resetForm}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Review Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="game">Game Name</Label>
                <Input
                  id="game"
                  value={formData.game}
                  onChange={(e) => setFormData({ ...formData, game: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Select value={formData.platform} onValueChange={(value) => setFormData({ ...formData, platform: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PS5">PS5</SelectItem>
                    <SelectItem value="PS4">PS4</SelectItem>
                    <SelectItem value="PS4/PS5">PS4/PS5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Action">Action</SelectItem>
                    <SelectItem value="RPG">RPG</SelectItem>
                    <SelectItem value="FPS">FPS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">Rating (0-10)</Label>
                <Input
                  id="rating"
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Publication Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="readTime">Read Time</Label>
                <Input
                  id="readTime"
                  value={formData.readTime}
                  onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Full Review Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={6}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Pros</Label>
                {formData.pros.map((pro, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={pro}
                      onChange={(e) => updateProsOrCons('pros', index, e.target.value)}
                      placeholder="Enter a positive point"
                    />
                    <Button type="button" size="sm" variant="outline" onClick={() => removeProOrCon('pros', index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" size="sm" variant="outline" onClick={() => addProOrCon('pros')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Pro
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Cons</Label>
                {formData.cons.map((con, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={con}
                      onChange={(e) => updateProsOrCons('cons', index, e.target.value)}
                      placeholder="Enter a negative point"
                    />
                    <Button type="button" size="sm" variant="outline" onClick={() => removeProOrCon('cons', index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" size="sm" variant="outline" onClick={() => addProOrCon('cons')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Con
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded"
              />
              <Label htmlFor="featured">Featured Review</Label>
            </div>

            <div className="flex space-x-3 pt-4 border-t">
              <Button type="submit" className="flex-1">
                {editingReview ? 'Update Review' : 'Create Review'}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CMSDialog;