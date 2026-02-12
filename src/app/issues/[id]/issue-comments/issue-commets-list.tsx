import { Comment } from '@/components/comment'
import { listIssueComments } from '@/http/list-issue-comments'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface IssueCommentsListProps {
  issueId: string
}
export default async function IssueCommentsList({
  issueId
}: IssueCommentsListProps) {
  const { comments } = await listIssueComments({ issueId })
  return (
    <div className="space-y-3">
      {comments.map(comment => {
        return (
          <Comment.Root key={comment.id}>
            <Comment.Header>
              <Comment.Avatar src={comment.author.avatar} />
              <Comment.Author>{comment.author.name}</Comment.Author>
              <Comment.Time>
                {formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                  locale: ptBR
                })}
              </Comment.Time>
            </Comment.Header>
            <Comment.Content>
              <Comment.Text>{comment.text}</Comment.Text>
            </Comment.Content>
          </Comment.Root>
        )
      })}
    </div>
  )
}
