'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { User, Mail, Calendar, MapPin } from 'lucide-react';

const ProfilePage = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800 rounded-2xl shadow-xl border border-blue-800 p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-gray-300 mb-6">
            You need to be logged in to view your profile.
          </p>
          <a 
            href="/login" 
            className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-black py-2 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-slate-800 rounded-2xl shadow-xl border border-blue-800 overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-12 text-center relative">
            <div className="flex justify-center mb-4">
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.name || 'User'}
                  className="w-32 h-32 rounded-full border-4 border-white object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-black flex items-center justify-center border-4 border-white">
                  <User className="w-16 h-16 text-orange-500" />
                </div>
              )}
            </div>
            <h1 className="text-3xl font-bold text-black">{user?.name || 'User'}</h1>
            <p className="text-black/80 mt-2">{user?.email}</p>
          </div>

          {/* Profile Content */}
          <div className="px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="bg-slate-700 p-6 rounded-xl">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-orange-500" />
                  Personal Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mr-4">
                      <User className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Full Name</p>
                      <p className="text-white">{user?.name || 'Not provided'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mr-4">
                      <Mail className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white">{user?.email || 'Not provided'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mr-4">
                      <Calendar className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Member Since</p>
                      <p className="text-white">{user?.id ? new Date().toLocaleDateString() : 'Unknown'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Settings */}
              <div className="bg-slate-700 p-6 rounded-xl">
                <h2 className="text-xl font-semibold text-white mb-4">Account Settings</h2>
                <div className="space-y-4">
                  <button className="w-full text-left p-4 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors">
                    <p className="text-white font-medium">Change Password</p>
                    <p className="text-gray-400 text-sm">Update your account password</p>
                  </button>
                  
                  <button className="w-full text-left p-4 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors">
                    <p className="text-white font-medium">Notification Preferences</p>
                    <p className="text-gray-400 text-sm">Manage your notification settings</p>
                  </button>
                  
                  <button className="w-full text-left p-4 bg-slate-600 hover:bg-slate-500 rounded-lg transition-colors">
                    <p className="text-white font-medium">Security Settings</p>
                    <p className="text-gray-400 text-sm">Configure two-factor authentication</p>
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-black py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                Edit Profile
              </button>
              <button className="flex-1 border-2 border-orange-500 text-orange-500 py-3 px-6 rounded-lg font-semibold hover:bg-orange-500/20 transition-all duration-300">
                Manage Payment Methods
              </button>
            </div>
          </div>
        </div>

        {/* Back to home */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <span className="mr-2">←</span>
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;