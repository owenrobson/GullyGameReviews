import React from 'react';
import { Gamepad2, Twitter, Youtube, Twitch, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-violet-500 p-2 rounded-lg">
                <Gamepad2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Gully Game Reviews</h3>
                <p className="text-sm text-slate-400">Expert Game Reviews</p>
              </div>
            </div>
            <p className="text-slate-300 mb-6 max-w-md">
              Your trusted source for in-depth PlayStation game reviews. All information provided is an honest,
              detailed analysis of the latest playstation titles to help you make informed gaming decisions.
            </p>
            {/* <div className="flex space-x-4">
              <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-slate-700 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-slate-700 transition-colors duration-200">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-slate-700 transition-colors duration-200">
                <Twitch className="h-5 w-5" />
              </a>
              <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-slate-700 transition-colors duration-200">
                <Mail className="h-5 w-5" />
              </a>
            </div> */}
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <p className="text-slate-400">
            © 2024 Gully Game Reviews. All rights reserved. Independent game review site.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;