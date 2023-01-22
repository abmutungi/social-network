package comment

type Comment struct {
	CommentId int `json:"commentID"`
	PostID int `json:"postID"`
	UserID int `json:"userID"`
	CreatedAt string `json:"date"`
	TextContent string `json:"textContent"`
	ImageContent string `json:"imageContent"`
}