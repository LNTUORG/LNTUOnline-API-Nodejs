
var agentConfig = {

    urls: [
        "http://60.18.131.131:11080/academic",
        "http://60.18.131.131:11081/academic",
        "http://60.18.131.131:11180/academic",    //*
        "http://60.18.131.131:11181/academic",
        "http://60.18.131.131:11080/newacademic", //*
        "http://60.18.131.131:11081/newacademic",
        "http://60.18.131.133:11180/newacademic", //*
        "http://60.18.131.133:11181/newacademic"  //*
    ],

    urlIndex: 2,

    timeout: 2000

};

module.exports = agentConfig;
