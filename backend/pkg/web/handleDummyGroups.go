package web

import (
	"encoding/json"
	"net/http"
)

type Group struct {
	GroupID   int
	GroupName string
	CreatorID int
	AboutText []string
	Members   int
}

/*
   "Black & White Army",
   "2011 Rashford Fan Club",
   "Sancho Support Club",
   "AirBnB crew",
   "AgendaZone",
   "Ski Club",
   "Suya Society",
   "SuperEaglesSupporters",
*/

var AllGroups = []Group{
	{
		GroupID:   1,
		GroupName: "Black & White Army",
		CreatorID: 1,
		AboutText: []string{"For Fans of the Northern Football Giant"},
		Members:   50000000,
	},

	{
		GroupID:   2,
		GroupName: "2011 Rashford Fan Club",
		CreatorID: 2,
		AboutText: []string{"Where Rashford stans unite"},
		Members:   2941,
	},
	{
		GroupID:   4,
		GroupName: "AirBnB crew",
		CreatorID: 4,
		AboutText: []string{"Don't sleep on us"},
		Members:   22,
	},
	{
		GroupID:   5,
		GroupName: "Ski Club",
		CreatorID: 4,
		AboutText: []string{"We love to ski"},
		Members:   46540,
	},
}

func (s *Server) HandleDummyGroups() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		enableCors(&w)

		Groups, err := json.Marshal(AllGroups)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(Groups)

	}

}
