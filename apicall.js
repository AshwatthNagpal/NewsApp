import { Component } from 'react'

class FetchData extends Component {
    async  getTopHeadline(source, category, lag, country) {
        var q = "";
        b = false;
        if (source !== "Default" && source !== "" && source != null) {
            q += "sources=" + source + "&"
            b = true
        }
        else {
            if (category !== "Default" && category !== "" && category != null) {
                q += "category=" + category + "&"
                b = true
            }
            if (lag !== "Default" && lag !== "" && lag != null) {
                q += "language=" + lag + "&";
                b = true
            }
            if (country !== "Default" && country !== "" && country != null) {
                q += "country=" + country + "&"
                b = true
            }
            if (!b) {
                q = "country=in&"
            }
        }
      
        return await fetch("https://newsapi.org/v2/top-headlines?" + q + "apiKey=f86a93859f404df0a26aed48fce16a7e").
            then(response => response.json()).catch(error => console.log(error));

    }
    async getSources(category, lag, country) {
        var q = "";
        b = false;

        if (category !== "Default" && category !== "" && category != null) {
            q += "category=" + category + "&"
            b = true
        }
        if (lag !== "Default" && lag !== "" && lag != null) {
            q += "language=" + lag + "&";
            b = true
        }
        if (country !== "Default" && country !== "" && country != null) {
            q += "country=" + country + "&"
            b = true
        }
        if (!b) {
            q = "country=in&"
        }

        return await fetch("https://newsapi.org/v2/sources?" + q + "apiKey=f86a93859f404df0a26aed48fce16a7e").then(
            q => q.json()
        ).catch(error => console.log(error))
    }
    async MultiSearch(q) {
        return await fetch('https://newsapi.org/v2/everything?q=' + q + '&apiKey=f86a93859f404df0a26aed48fce16a7e').then(
            q => q.json()
        )
    }
}

const fetchdata = new FetchData();
export default fetchdata;

