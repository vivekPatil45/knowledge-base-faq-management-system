import type { Analytics, Announcement, Article, User } from "../types";

export const users: User[] = [
  {
    id: '1',
    email: 'admin@company.com',
    role: 'admin',
    name: 'Admin User'
  },
  {
    id: '2',
    email: 'employee@company.com',
    role: 'employee',
    name: 'John Employee'
  }
];

export const articles: Article[] = [
  {
    id: '1',
    title: 'How to reset company email password?',
    category: 'IT Support',
    content: `# Password Reset Guide

Follow these simple steps to reset your company email password:

## Step 1: Access the Password Reset Portal
Navigate to the company portal and click on "Forgot Password"

## Step 2: Enter Your Email
Type in your company email address and click "Send Reset Link"

## Step 3: Check Your Email
Look for an email from IT Support with reset instructions

## Step 4: Create New Password
Follow the link and create a strong password with:
- At least 8 characters
- Mix of uppercase and lowercase letters
- Numbers and special characters

## Need Help?
Contact IT Support at ext. 1234 if you need assistance.`,
    tags: ['password', 'email', 'reset', 'IT'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    authorId: '1',
    helpfulCount: 45,
    notHelpfulCount: 3
  },
  {
    id: '2',
    title: 'How to request vacation time?',
    category: 'HR',
    content: `# Vacation Request Process

## Online Portal
1. Log into the HR portal
2. Navigate to "Time Off" section
3. Select "Request Vacation"
4. Choose your dates and submit

## Approval Process
Your manager will be notified automatically and should respond within 2 business days.

## Important Notes
- Submit requests at least 2 weeks in advance
- Check team calendar for conflicts
- Maximum 2 weeks consecutive vacation`,
    tags: ['vacation', 'time-off', 'HR', 'request'],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    authorId: '1',
    helpfulCount: 38,
    notHelpfulCount: 1
  },
  {
    id: '3',
    title: 'Setting up VPN for remote work',
    category: 'IT Support',
    content: `# VPN Setup Guide

## Download VPN Client
Contact IT to get the approved VPN client for your operating system.

## Installation Steps
1. Download the installer
2. Run as administrator
3. Follow setup wizard
4. Use your company credentials

## Troubleshooting
If you can't connect:
- Check your internet connection
- Verify credentials
- Try different server locations
- Contact IT if issues persist`,
    tags: ['VPN', 'remote', 'work', 'security'],
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08'),
    authorId: '1',
    helpfulCount: 52,
    notHelpfulCount: 7
  },
  {
    id: '4',
    title: 'Company expense reimbursement policy',
    category: 'Finance',
    content: `# Expense Reimbursement

## Eligible Expenses
- Business travel
- Client entertainment
- Office supplies
- Professional development

## Submission Process
1. Keep all receipts
2. Use expense portal within 30 days
3. Upload receipt photos
4. Fill out expense details

## Approval Timeline
Expenses are typically processed within 5-7 business days after approval.`,
    tags: ['expenses', 'reimbursement', 'policy', 'finance'],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
    authorId: '1',
    helpfulCount: 29,
    notHelpfulCount: 2
  },
  {
    id: '5',
    title: 'Software license requests',
    category: 'IT Support',
    content: `# Software License Request Process

## Request Types
- New software licenses
- License renewals
- Additional user seats

## How to Request
1. Submit IT ticket with software details
2. Include business justification
3. Specify number of licenses needed
4. Provide cost center for billing

## Approval Process
All software requests require manager and IT approval before procurement.`,
    tags: ['software', 'license', 'request', 'approval'],
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
    authorId: '1',
    helpfulCount: 33,
    notHelpfulCount: 5
  }
];

export const announcements: Announcement[] = [
  {
    id: '1',
    title: 'System Maintenance Scheduled',
    content: 'Our IT systems will undergo maintenance this Saturday from 2 AM - 6 AM EST. Email and internal tools may be temporarily unavailable.',
    createdAt: new Date('2024-01-20'),
    authorId: '1',
    priority: 'high'
  },
  {
    id: '2',
    title: 'New Employee Onboarding Process',
    content: 'We\'ve updated our employee onboarding process. Please review the new documentation in the HR section.',
    createdAt: new Date('2024-01-18'),
    authorId: '1',
    priority: 'medium'
  },
  {
    id: '3',
    title: 'Holiday Schedule Updated',
    content: 'The 2024 holiday schedule has been published. Check the HR portal for updated dates and office closure information.',
    createdAt: new Date('2024-01-15'),
    authorId: '1',
    priority: 'low'
  }
];

export const analytics: Analytics = {
  mostSearchedKeywords: [
    { keyword: 'password reset', count: 156 },
    { keyword: 'VPN', count: 89 },
    { keyword: 'vacation', count: 67 },
    { keyword: 'expense', count: 45 },
    { keyword: 'software license', count: 34 }
  ],
  mostHelpfulArticles: [
    { article: articles[2], score: 88 }, // VPN setup
    { article: articles[0], score: 94 }, // Password reset
    { article: articles[1], score: 97 }  // Vacation request
  ],
  leastHelpfulArticles: [
    { article: articles[4], score: 87 }, // Software license
    { article: articles[3], score: 93 }  // Expense policy
  ],
  totalArticles: articles.length,
  totalSearches: 391,
  totalFeedback: 215
};

export const categories = [
  'All Categories',
  'IT Support',
  'HR',
  'Finance',
  'Operations',
  'Legal',
  'Marketing'
];