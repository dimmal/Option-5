import { League, LeagueDetails, Sport } from "../models/accepted-test";

export interface GetListResponse {
	leagues: Array<League>;
}

export interface GetDetailsResponse {
	leagues: Array<LeagueDetails>;
}

export interface GetSportsResponse {
	sports: Array<Sport>;
}