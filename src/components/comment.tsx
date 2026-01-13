"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FaReply, FaThumbsUp } from "react-icons/fa";

export interface Comment {
  id: number;
  author: string;
  authorAvatar?: string;
  content: string;
  date: string;
  likes: number;
  replies?: Comment[];
}

interface CommentProps {
  comment: Comment;
  onReply?: (commentId: number) => void;
}

function CommentItem({ comment, onReply }: CommentProps) {
  const t = useTranslations("blog.comments");
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(comment.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <div className="flex gap-4">
      {/* Avatar */}
      <div className="shrink-0">
        {comment.authorAvatar ? (
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={comment.authorAvatar}
              alt={comment.author}
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
            {comment.author.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="bg-gray-50 rounded-lg p-4">
          {/* Author and date */}
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-900">{comment.author}</span>
            <span className="text-xs text-gray-500">{comment.date}</span>
          </div>

          {/* Comment text */}
          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            {comment.content}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                isLiked
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              <FaThumbsUp className="w-3.5 h-3.5" />
              <span>{likesCount}</span>
            </button>
            {onReply && (
              <button
                onClick={() => onReply(comment.id)}
                className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-blue-600 transition-colors"
              >
                <FaReply className="w-3.5 h-3.5" />
                <span>{t("reply")}</span>
              </button>
            )}
          </div>
        </div>

        {/* Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4 ml-4 space-y-4 border-l-2 border-gray-200 pl-4">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface CommentsSectionProps {
  comments: Comment[];
  onReply?: (commentId: number) => void;
}

export default function CommentsSection({
  comments,
  onReply,
}: CommentsSectionProps) {
  const t = useTranslations("blog.comments");

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        {t("title")} ({comments.length})
      </h3>

      {comments.length === 0 ? (
        <p className="text-gray-500 text-center py-8">{t("noComments")}</p>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  );
}

