package web

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/abmutungi/social-network/backend/pkg/register"
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

type RegistrationResponse struct {
	Message     string `json:"regMsg"`
	ErrorExists bool   `json:"error"`
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	(*w).Header().Set("Access-Control-Allow-Credentials", "true")
	(*w).Header().Set("Access-Control-Allow-Headers", "Content-Type, Accept, Content-Length, Authorization")
	(*w).Header().Set("Access-Control-Allow-Method", "POST, GET, OPTIONS, DELETE")

}

func (s *Server) HandleRegister() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)
		//s.Db, _ = sql.Open("sqlite3", "connect-db.db")
		var regResp RegistrationResponse
		err := r.ParseMultipartForm(10 << 20)
		if err != nil {
			fmt.Printf("Errror when parsing registration form: %v", err)
		}

		var rd RegistrationData

		// if file is added in form, create file for image and return filename
		if r.Form.Get("imgName") != "" {
			rd.Avatar = s.HandleImage(r, "avatar")
		}

		data, err := io.ReadAll(r.Body)
		if err != nil {
			log.Println(err)
		}

		fmt.Println("checking data --> ", string(data))

		//json.Unmarshal(data, &rd)
		rd.FName = r.Form.Get("firstName")
		rd.LName = r.Form.Get("lastName")
		rd.Email = r.Form.Get("email")
		rd.Password = r.Form.Get("password")
		rd.DOB = r.Form.Get("dateOfBirth")
		rd.Nickname = r.Form.Get("nickname")
		rd.AboutMe = r.Form.Get("aboutMe")

		fmt.Println(rd.FName)
		fmt.Println(rd.LName)
		fmt.Println(rd.Email)
		fmt.Println(rd.Password)
		fmt.Println(rd.DOB)
		fmt.Println(rd.Nickname)
		fmt.Println(rd.AboutMe)
		fmt.Println(rd.Avatar)

		fmt.Println("Checking if email exists --> ", register.CheckEmailExists(s.Db, rd.Email))
		if register.CheckEmailExists(s.Db, rd.Email) {
			sendRegistrationMessage(w, regResp, true, "Email already exists, please log in using it!")
			return
		}
		fmt.Println("Checking if domain used is valid --> ", register.ValidEmailDomainCheck(rd.Email))
		fmt.Println("Checking password is valid --> ", register.CheckPasswordValid(rd.Password))
		if register.CheckPasswordValid(rd.Password) {
			fmt.Println(register.EncryptPassword(rd.Password))
			sendRegistrationMessage(w, regResp, false, "Registration valid")
			register.StoreNewUserInDatabase(s.Db, rd.Email, register.EncryptPassword(rd.Password), rd.FName, rd.LName, rd.DOB, rd.Avatar, rd.Nickname, rd.AboutMe, 0)
		} else if !register.CheckPasswordValid(rd.Password) {
			sendRegistrationMessage(w, regResp, true, "Password invalid, make sure it satisfies all requirements!")
			return
		}

	}

}

func sendRegistrationMessage(w http.ResponseWriter, regResp RegistrationResponse, errExists bool, msg string) {
	regResp.Message = msg
	regResp.ErrorExists = errExists
	fmt.Println("rr check -> ", regResp)
	resp, err := json.Marshal(regResp)
	if err != nil {
		fmt.Println("Error marshalling error message struct --> ", err)
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(resp))

}
