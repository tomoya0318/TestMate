import { useState } from 'react';
import { Box, Button, Textarea, VStack } from '@chakra-ui/react';
import { addComment } from '@/api/add-comment';

type AddCommentFormProps = {
  postId: string;
  userId: string;
}

export const AddCommentForm: React.FC<AddCommentFormProps> = ({ postId, userId }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await addComment({ content, postId, userId });
      setContent(''); // Clear the content after successful submission
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
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
        {error && <Box color="red.500">{error}</Box>}
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
