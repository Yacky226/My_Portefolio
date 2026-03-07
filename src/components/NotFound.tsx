import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from './ui/button';
import { useI18n } from '../hooks/useI18n';

export function NotFound() {
    const { t } = useI18n();

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center space-y-8 max-w-lg">
                {/* Big 404 */}
                <div className="relative">
                    <h1
                        className="text-[10rem] md:text-[14rem] font-bold leading-none select-none"
                        style={{
                            color: 'var(--accent)',
                            opacity: 0.15,
                        }}
                    >
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="space-y-4">
                            <h2
                                className="text-3xl md:text-4xl font-bold"
                                style={{ color: 'var(--text)' }}
                            >
                                Page not found
                            </h2>
                            <p
                                className="text-lg"
                                style={{ color: 'var(--muted)' }}
                            >
                                The page you're looking for doesn't exist or has been moved.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        asChild
                        className="bg-accent hover:bg-accent-2 text-bg font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105"
                        style={{
                            backgroundColor: 'var(--accent)',
                            color: 'var(--bg)',
                        }}
                    >
                        <Link to="/">
                            <Home className="w-5 h-5 mr-2" />
                            Back to Home
                        </Link>
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => window.history.back()}
                        className="border-border hover:bg-surface font-semibold px-8 py-4 rounded-lg transition-all duration-300"
                        style={{
                            borderColor: 'var(--border)',
                            color: 'var(--text)',
                        }}
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Go Back
                    </Button>
                </div>
            </div>
        </div>
    );
}
