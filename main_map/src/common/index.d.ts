export interface WebSocketMessage {
    type: string,
    data: MapInfo | EditCrossUsers
}

export interface EditCrossUsers {
    EditCrossUsers: []
}

export interface MapInfo {
    access: Access;
    area: Area;
    areaInfo: AreaInfo;
    areaZone: AreaZone[];
    authorizedFlag: boolean;
    boxPoint: BoxPoint;
    description: string;
    fragments: Fragment[];
    license: string;
    region: string;
    regionInfo: RegionInfo;
    role: string;
    tflight: Tflight[];
}

export interface AccountState {
    access: Access | undefined;
    area: Area | undefined;
    authorizedFlag: boolean;
    boxPoint: BoxPoint | undefined;
    description: string;
    fragments: Fragment[];
    license: string;
    region: string;
    role: string;
}

export interface Tflight {
    ID: number;
    region: Region;
    area: Area2;
    subarea: number;
    idevice: number;
    tlsost: Tlsost;
    description: string;
    phases: number[];
    points: Points;
    inputError: boolean;
}

export interface Access {
    [index: number]: boolean
}

export interface Area {
    [index: string]: string
}

export interface AreaInfo {
    [index: string]: Area
}

export interface Zone {
    Y: number;
    X: number;
}

export interface Sub {
    subArea: number;
    zone: Zone[];
}

export interface AreaZone {
    region: string;
    area: string;
    zone: Zone[];
    sub: Sub[];
}

export interface Point0 {
    Y: number;
    X: number;
}

export interface Point1 {
    Y: number;
    X: number;
}

export interface BoxPoint {
    point0: Point0;
    point1: Point1;
}

export interface Fragment {
    name: string;
    bounds: number[][];
}

export interface RegionInfo {
    [index: string]: string
}

export interface Region {
    num: string;
    nameRegion: string;
}

export interface Area2 {
    num: string;
    nameArea: string;
}

export interface Tlsost {
    num: number;
    description: string;
    control: boolean;
}

export interface Points {
    Y: number;
    X: number;
}