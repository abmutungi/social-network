package web

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
)

type RegistrationData struct {
	FName    string `json:"firstName"`
	LName    string `json:"lastName"`
	Email    string `json:"email"`
	Password string `json:"password"`
	DOB      string `json:"dateOfBirth"`
	Nickname string `json:"nickname"`
	AboutMe  string `json:"aboutMe"`
	Avatar   string `json:"avatar"`
}

func (s *Server) HandleRegister(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "localhost:5173/register")
	data, err := io.ReadAll(r.Body)
	if err != nil {
		log.Println(err)
	}

	fmt.Println(string(data))

	var rd RegistrationData

	json.Unmarshal(data, &rd)

	fmt.Println(rd.FName)
	fmt.Println(rd.LName)
	fmt.Println(rd.Email)
	fmt.Println(rd.Password)
	fmt.Println(rd.DOB)

}
