import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <div className="flex items-center space-x-2 text-red-500 bg-red-500/10 p-4 rounded-lg">
    <AlertCircle className="h-5 w-5" />
    <span>{message}</span>
  </div>
);

export default ErrorMessage;