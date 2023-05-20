package main

import (
    "fmt"
    "log"
    "net/http"
    "encoding/json"
)

type AuthResponse struct {
    status string
}


func loginHandler (w http.ResponseWriter, r *http.Request) {
    tokenStr, err := r.Cookie("shareToken") 
    fmt.Println("\nLogged in with cookie token:")
	  fmt.Println(tokenStr)
    w.Write([]byte("OK"))
    if (err != nil) {
        return 
    }
    token := tokenStr.Value;
    if (token == "test") {
      authResponse := AuthResponse{status:"OK"}
      w.Header().Set("Content-Type", "application/json")
      authJson, _ := json.Marshal(authResponse)
      fmt.Println(authJson)
    }
       
    fmt.Fprintf(w, "Err")
}

func main() {

    http.HandleFunc("/login", loginHandler);

    log.Fatal(http.ListenAndServe("localtest.me:8081", nil))

}
