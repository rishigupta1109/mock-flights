//Config Types
type Status = {
	responseCode: string;
	responseCodeCause: string;
	responseMessage: string;
};

export type City = {
	iataCode: string;
	city: string;
	countryCode: string;
	name?: string;
	iconUrl?: string;
};

type ConfigMap = {
	[key: string]: string;
};

export type Traveller = {
	key: string;
	value: string;
};

export type Guest = {
	guestType: string;
	textName: string;
	subTextName: string;
	defaultValue: number;
	minValue: number;
	maxValue: number;
	displayOrder: number;
	errorMessage: string;
	value?: number;
};

type FilterValueList = {
	filterValues: string[];
};

type Filter = {
	filterId: number;
	appliedFilterValueList: FilterValueList;
};

type AppliedSortFilter = {
	tabId: string;
	sortId: string;
	filtersList: Filter[];
};

type SearchRequest = {
	src: City;
	des: City;
	travellerClass: string;
	departDate: string;
	returnDate: string;
	adultCount: number;
	childCount: number;
	infantCount: number;
	isRoundTrip: boolean;
	partnerCountry: string;
	partnerCurrency: string;
	configMap: ConfigMap;
	travellers: Traveller[];
	guests: Guest[];
	defaultSortFilter: AppliedSortFilter;
};

type Payload = {
	'wallet-info': string;
};

type CategorySdkConfig = {
	couponEnabled: boolean;
	walletEnabled: boolean;
	payload: Payload;
};

export type ConfigResponse = {
	status: Status;
	searchRequest: SearchRequest;
	categorySdkConfig: CategorySdkConfig;
};

//Wallet Types

type WResponse = {
	responseCode: string;
	responseCodeCause: string;
	responseMessage: string;
};

type DisplayInfo = {
	toast_message: string;
	overlay_message: string;
	currency_symbol: string;
};

type WalletDetails = {
	walletName: string;
	walletTotalBalance: number;
	walletAppliedRedeemedAmount: number;
	walletRollbackAmount: number;
	userBlocked: boolean;
	banner: string;
	displayInfo: DisplayInfo;
};

export type WalletResponse = {
	response: WResponse;
	walletDetails: WalletDetails;
};

//Upcoming Booking Types

//Popular Cities Types
//Search City Types

export type Airport = {
	iataCode: string;
	city: string;
	name: string;
	countryCode: string;
	iconUrl: string;
};

export type AirportListResponse = {
	status: Status;
	title: string;
	airportList: Airport[];
};

//Search Flight Request Types

type Passenger = {
	adultCount: number;
	infantCount: number;
	childCount: number;
};

type TravellerClass = {
	key: string;
	value: string;
};

export type FlightSearchRequest = {
	src: City;
	des: City;
	departDate: string;
	partnerCountry: string;
	passenger: Passenger;
	travellerClass: TravellerClass;
	appliedSortFilter: AppliedSortFilter[];
};

//Search Flight Response Types
type CtaAction = {
	retryApiCall: boolean;
};

type CtaButton = {
	flex: number;
	ctaText: string;
	ctaActions: CtaAction[];
	disabled: boolean;
	buttonType: string;
};

type BottomOverlayError = {
	height: number;
	title: string;
	description: string;
	imageUrl: string;
	fixed: boolean;
	ctaButtons: CtaButton[];
	screenType: string;
	htmlDescription: string;
	barrierDismissible: boolean;
	showCrossButton: boolean;
};

type ErrorHandlingDetail = {
	bottomOverlayError: BottomOverlayError;
	extraInfo: Record<string, unknown>;
};
type FlightSegment = {
	segmentId: string;
	onwardSegmentDetails: {
		arrivalTime: string;
		departTime: string;
		arrivalTimestamp: string;
		departTimestamp: string;
		duration: string;
		stops: string;
		airlineCode: string;
		sourceAirportCode: Airport;
		destinationAirportCode: Airport;
		airlineTime: string;
		airlineDuration: string;
		segmentAirlineInfos: {
			airlineName: string;
			airlineIconUrl: string;
		}[];
	};
	refundable: boolean;
	hasFreeMeal: boolean;
	handBaggageOnlyFare: boolean;
	fareList: {
		fareId: string;
		partnerId: number;
		partnerName: string;
		fare: number;
		currencySymbol: string;
		fareS: string;
		color: {
			red: number;
			green: number;
			blue: number;
		};
	}[];
	specialFeatures: {
		title: string;
		icon: string;
	}[];
};
export type FlightSearchResponse = {
	errorHandlingDetail: ErrorHandlingDetail;
	onwardFlights: FlightSegment[];
	returnFlights: any[];
	isRoundTrip: boolean;
	onwardFareCalendar: any[];
	quickFilters: any[];
	minimumTimeGapForRoundTrip: string;
	isInternational: boolean;
	warningMessages: any[];
};
