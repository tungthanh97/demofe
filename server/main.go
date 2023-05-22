package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/rs/cors"
)

type AuthResponse struct {
    status string
    name string
    token string
}

func loginHandler (w http.ResponseWriter, r *http.Request) {
    tokenStr, _ := r.Cookie("shareToken") 
    fmt.Println("\nLogged in with cookie token:")
	  fmt.Println(tokenStr)
    token := tokenStr.Value;
    if (token == "test") {
      w.Header().Set("Content-Type", "application/json")
      w.WriteHeader(http.StatusOK)
    } else{
      w.WriteHeader(http.StatusUnauthorized)
    }
}

func main() {
    mux := http.NewServeMux()   
    mux.HandleFunc("/login",loginHandler)

     c := cors.New(cors.Options{
       AllowedOrigins: []string{"http://localtest.me:4000","http://sub.localtest.me:4001"},  // Update with your frontend domain
        AllowedMethods: []string{"GET", "POST"},  // Update with allowed HTTP methods
         AllowCredentials: true,
    })

    handlerWithCORS := c.Handler(mux)
    log.Fatal(http.ListenAndServe("localtest.me:8081", handlerWithCORS))
}
