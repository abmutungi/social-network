package posts

// can change the name of imageContent in db to imgPath
type Posts struct {
	PostID int `json:"postID"`
	UserID int `json:"userID"`
	Username string `json:"username"`
	TextContent string `json:"textContent"`
	ImageContent string `json:"imgPath"`
	CreatedAt string `json:"createdAt"`
	Privacy string `json:"privacy"`
}