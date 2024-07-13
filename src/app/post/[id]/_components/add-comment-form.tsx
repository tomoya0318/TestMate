'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Textarea, VStack, useToast } from '@chakra-ui/react';
import { addComment } from '@/api/add-comment';

type AddCommentFormProps = {
  postId: string;
  userId: string;
}

export const AddCommentForm: React.FC<AddCommentFormProps> = ({ postId, userId }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await addComment({ content, postId, userId });
      setContent(''); // Clear the content after successful submission
      toast({
        title: "コメントが投稿されました。",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setTimeout(() => {
        router.push('/');
      }, 2000); // Redirect after 2 seconds
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      toast({
        title: "エラーが発生しました。",
        description: error,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} width="100%">
      <VStack spacing={4}>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="コメントを入力してください"
          required
        />
        <Button
          type="submit"
          colorScheme="teal"
          isLoading={isSubmitting}
        >
          コメントを投稿
        </Button>
      </VStack>
    </Box>
  );
};
