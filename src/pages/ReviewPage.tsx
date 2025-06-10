import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Clock, User, Star, ThumbsUp, ThumbsDown, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useReviews } from '@/hooks/useReviews';
import { Link } from 'react-router-dom';
import ReviewCard from '@/components/ReviewCard';

const ReviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { reviews } = useReviews();

  const review = reviews.find(r => r.id === parseInt(id || '0'));

  // Scroll to top when component mounts or id changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!review) {
    return <Navigate to="/\" replace />;
  }

  // Get other reviews (excluding current one)
  const otherReviews = reviews.filter(r => r.id !== review.id).slice(0, 6);

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
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link to="/" className="inline-block mb-6">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Reviews
            </Button>
          </Link>

          <Card className="overflow-hidden shadow-2xl">
            {/* Hero Image */}
            <div className="relative h-96 overflow-hidden">
              <img
                src={review.image}
                alt={review.game}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className={`${getCategoryColor(review.category)} text-white`}>
                    {review.category}
                  </Badge>
                  <Badge variant="secondary" className="bg-black/50 text-white">
                    {review.platform}
                  </Badge>
                  <div className={`flex items-center space-x-1 bg-black/50 px-3 py-1 rounded-full ${getRatingColor(review.rating)}`}>
                    <Star className="h-5 w-5 fill-current" />
                    <span className="text-lg font-bold text-white">{review.rating}</span>
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {review.title}
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-blue-200 mb-4">
                  {review.game}
                </h2>
              </div>
            </div>

            <CardHeader className="pb-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-6 text-slate-600">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span className="font-medium">{review.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>{review.readTime}</span>
                  </div>
                  <span>{new Date(review.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="prose prose-lg max-w-none">
              {/* Excerpt */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
                <p className="text-xl text-slate-700 italic leading-relaxed">
                  {review.excerpt}
                </p>
              </div>

              {/* Full Content */}
              <div className="text-slate-700 leading-relaxed space-y-6">
                {review.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Pros and Cons */}
              {(review.pros.length > 0 || review.cons.length > 0) && (
                <div className="grid md:grid-cols-2 gap-8 mt-12 pt-8 border-t border-slate-200">
                  {review.pros.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-green-600 flex items-center">
                        <ThumbsUp className="h-6 w-6 mr-2" />
                        What We Loved
                      </h3>
                      <ul className="space-y-3">
                        {review.pros.map((pro, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0" />
                            <span className="text-slate-700">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {review.cons.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-red-600 flex items-center">
                        <ThumbsDown className="h-6 w-6 mr-2" />
                        Room for Improvement
                      </h3>
                      <ul className="space-y-3">
                        {review.cons.map((con, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0" />
                            <span className="text-slate-700">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Final Rating */}
              <div className="mt-12 pt-8 border-t border-slate-200 text-center">
                <div className="inline-flex items-center space-x-4 bg-slate-100 px-8 py-4 rounded-2xl">
                  <span className="text-2xl font-bold text-slate-700">Final Score:</span>
                  <div className={`flex items-center space-x-2 ${getRatingColor(review.rating)}`}>
                    <Star className="h-8 w-8 fill-current" />
                    <span className="text-4xl font-bold">{review.rating}</span>
                    <span className="text-2xl text-slate-500">/10</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* More Reviews Section */}
      {otherReviews.length > 0 && (
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherReviews.map(otherReview => (
                <ReviewCard key={otherReview.id} review={otherReview} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/">
                <Button size="lg" variant="outline" className="px-8">
                  View All Reviews
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ReviewPage;