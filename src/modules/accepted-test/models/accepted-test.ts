
export interface League {
    idLeague: string;
    strLeague: string;
    strSport: string;
    strLeagueAlternate: string;
}

export interface LeagueDetails {
    idLeague: string;
    idSoccerXML: any;
    idAPIfootball: string;
    strSport: string;
    strLeague: string;
    strLeagueAlternate: string;
    strDivision: string;
    idCup: string;
    strCurrentSeason: string;
    intFormedYear: string;
    dateFirstEvent: string;
    strGender: string;
    strCountry: string;
    strWebsite: string;
    strFacebook: string;
    strTwitter: string;
    strYoutube: string;
    strRSS: string;
    strDescriptionEN: string;
    strDescriptionDE: any;
    strDescriptionFR: string;
    strDescriptionIT: string;
    strDescriptionCN: string;
    strDescriptionJP: string;
    strDescriptionRU: string;
    strDescriptionES: string;
    strDescriptionPT: string;
    strDescriptionSE: string;
    strDescriptionNL: string;
    strDescriptionHU: any;
    strDescriptionNO: string;
    strDescriptionPL: string;
    strDescriptionIL: string;
    strTvRights: string;
    strFanart1: string;
    strFanart2: string;
    strFanart3: string;
    strFanart4: string;
    strBanner: string;
    strBadge: string;
    strLogo: string;
    strPoster: string;
    strTrophy: string;
    strNaming: string;
    strComplete: string;
    strLocked: string;
}

export interface Sport {
    idSport: string;
	strSport: string;
    strFormat: string;
    strSportThumb: string;
    strSportIconGreen: string;
    strSportDescription: string;
}
