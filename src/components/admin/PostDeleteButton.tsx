"use client";

import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { useState } from 'react';

export default function PostDeleteButton({ id }: { id: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this post?')) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                router.refresh();
            } else {
                alert('Failed to delete');
            }
        } catch (error) {
            alert('Error deleting post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            loading={loading}
            className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
        >
            <Trash2 size={18} />
        </Button>
    );
}
