import React from 'react';
import { Clock, User, Star } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { GameReview } from '@/data/gameReviews';

interface ReviewCardProps {
  review: GameReview;
  featured?: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, featured = false }) => {
  const getRatingColor = (rating: number) => {
    if (rating >= 9) return 'text-green-500';
    if (rating >= 7) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Action': return 'bg-red-500';
      case 'RPG': return 'bg-purple-500';
      case 'FPS': return 'bg-blue-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <Link to={`/review/${review.id}`}>
      <Card className={`group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer ${featured ? 'md:col-span-2 lg:col-span-2' : ''
        }`}>
        <div className="relative overflow-hidden">
          <img
            src={review.image}
            alt={review.game}
            className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${featured ? 'h-64 md:h-80' : 'h-48'
              }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className={`${getCategoryColor(review.category)} text-white`}>
              {review.category}
            </Badge>
            <Badge variant="secondary" className="bg-black/50 text-white">
              {review.platform}
            </Badge>
          </div>
          <div className="absolute top-4 right-4">
            <div className={`flex items-center space-x-1 bg-black/50 px-2 py-1 rounded-full ${getRatingColor(review.rating)}`}>
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-bold text-white">{review.rating}</span>
            </div>
          </div>
        </div>

        <CardHeader className="pb-3">
          <div className="flex items-center space-x-4 text-sm text-slate-500 mb-2">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{review.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{review.readTime}</span>
            </div>
            <span>{new Date(review.date).toLocaleDateString()}</span>
          </div>

          <h2 className={`font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-200 ${featured ? 'text-2xl md:text-3xl' : 'text-xl'
            }`}>
            {review.title}
          </h2>

          <p className="text-lg font-semibold text-slate-700 mb-2">
            {review.game}
          </p>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-slate-600 leading-relaxed mb-4">
            {review.excerpt}
          </p>

          <div className="inline-flex items-center text-blue-500 font-semibold hover:text-blue-700 transition-colors duration-200 group">
            Read Full Review
            <svg className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ReviewCard;