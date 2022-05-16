class Data1Form {
  constructor({ email, profile, score, createdAt, updatedAt }) {
    this.email = email;
    this.profile = profile;
    this.score = score;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  get defaultForm() {
    const defaultForm = {
      email: this.email,
      name: this.profile.name,
      birthday: this.profile.birthday,
      address: this.profile.address,
      score: this.score,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      dataFlow: [
        "email",
        "name",
        "birthday",
        "address",
        "score",
        "createdAt",
        "updatedAt",
      ],
    };
    return defaultForm;
  }
}

class Data2Form {
  constructor({ username, scores }) {
    this.username = username;
    this.scores = scores;
    this.subjectList = [
      "html",
      "css",
      "javascript",
      "korean",
      "english",
      "math",
    ];
  }

  get defaultForm() {
    const defaultForm = {
      username: this.username,
      total: this.totalScore(),
      average: this.averageScore(),
      html: this.scores.html,
      css: this.scores.css,
      javascript: this.scores.javascript,
      korean: this.scores.korean,
      english: this.scores.english,
      math: this.scores.math,
      dataFlow: [
        "username",
        "total",
        "average",
        "html",
        "css",
        "javascript",
        "korean",
        "english",
        "math",
      ],
    };
    return defaultForm;
  }

  totalScore() {
    let totalResult = 0;
    this.subjectList.map(
      (subject) => (totalResult += this.scores[String(subject)])
    );

    return totalResult;
  }

  averageScore() {
    const averageResult = (this.totalScore() / this.subjectList.length).toFixed(
      2
    );
    return averageResult;
  }
}

class Data3Form {
  constructor({ index, nickname, profile, verified }) {
    this.index = index;
    this.nickname = nickname;
    this.profile = profile;
    this.verified = verified;
  }

  get defaultForm() {
    const defaultForm = {
      index: this.index,
      nickname: this.nickname,
      age: this.profile.age,
      remoteWorkLocation: this.profile.remoteWorkLocation,
      position: this.profile.position,
      verified: this.checkVerified(),
      dataFlow: [
        "index",
        "nickname",
        "age",
        "remoteWorkLocation",
        "position",
        "verified",
      ],
    };
    return defaultForm;
  }

  checkVerified() {
    switch (this.verified) {
      case true:
        return "검증";
      case false:
        return "미검증";
      default:
        return "-";
    }
  }
}

export const flattenRawData = ({ rawData, dataType }) => {
  const flattenData = [];

  rawData.map((element) => {
    let flattenElement = undefined;

    switch (dataType) {
      case "data1":
        flattenElement = new Data1Form(element);
        break;
      case "data2":
        flattenElement = new Data2Form(element);
        break;
      case "data3":
        flattenElement = new Data3Form(element);
        break;

      default:
        console.log("Error type");
        flattenElement = new Data1Form(element);
    }

    flattenData.push(flattenElement.defaultForm);
  });

  return flattenData;
};
