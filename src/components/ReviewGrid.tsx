import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReviewCard from './ReviewCard';
import { useReviews } from '@/hooks/useReviews';

const ReviewGrid: React.FC = () => {
  const { reviews } = useReviews();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Action', 'RPG', 'FPS'];

  // Skip the first review (latest) as it's shown in the hero section
  const otherReviews = reviews.slice(1);

  const filteredReviews = selectedCategory === 'All'
    ? otherReviews
    : otherReviews.filter(review => review.category === selectedCategory);

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            More Reviews
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Explore our complete collection of PlayStation game reviews and discover your next gaming adventure.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <div className="flex items-center space-x-2 text-slate-600">
            <Filter className="h-5 w-5" />
            <span className="font-medium">Filter by:</span>
          </div>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="transition-all duration-200"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* All Reviews */}
        {filteredReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredReviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-slate-500">No reviews found in this category.</p>
            <Button
              variant="link"
              onClick={() => setSelectedCategory('All')}
              className="mt-4"
            >
              View all reviews
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewGrid;