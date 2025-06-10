import React, { useState, useEffect } from 'react';
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
import { useAuth } from '@/hooks/useAuth';
import { Loader2, Eye, EyeOff } from 'lucide-react';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginSuccess?: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ open, onOpenChange, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, error, clearAuthError } = useAuth();

  // Get demo credentials from environment variables
  const demoUsername = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
  const demoPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'password';

  // Clear error when dialog opens/closes or when user types
  useEffect(() => {
    if (open) {
      clearAuthError();
    }
  }, [open, clearAuthError]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) {
      clearAuthError();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username.trim() || !formData.password.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await login(formData.username.trim(), formData.password);

      if (success) {
        // Reset form
        setFormData({ username: '', password: '' });
        setShowPassword(false);

        // Close dialog
        onOpenChange(false);

        // Call success callback
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      }
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDialogChange = (newOpen: boolean) => {
    if (!newOpen && !isSubmitting) {
      // Reset form when closing
      setFormData({ username: '', password: '' });
      setShowPassword(false);
      clearAuthError();
    }
    onOpenChange(newOpen);
  };

  const fillDemoCredentials = () => {
    setFormData({
      username: demoUsername,
      password: demoPassword
    });
    clearAuthError();
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Admin Login</DialogTitle>
          <DialogDescription className="text-center">
            Enter your credentials to access the content management system
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder="Enter your username"
                disabled={isSubmitting}
                autoComplete="username"
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Enter your password"
                  disabled={isSubmitting}
                  autoComplete="current-password"
                  className="h-11 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                  disabled={isSubmitting}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-11 text-base font-medium"
            disabled={isSubmitting || !formData.username.trim() || !formData.password.trim()}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;