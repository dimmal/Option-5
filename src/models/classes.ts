export interface DnDModuleCharacterData {
	name: string;
	acronym: string;
	classes?: Array<Class>;
	eInvocations?: Array<EldritchInvocation>;
	feats?: Array<Feat>;
	backgrounds?: Array<Background>;
	backgroundFluff?: Array<BackgroundFluff>;
	races?: Array<Race>;
	raceFluff?: Array<RaceFluff>;
	subclasses?: Array<ClassSubclasses>;
	aInfusions?: Array<ArtificerInfusion>;
  }

  export interface Class {
	name: string;
	source: string;
	hd: string;
	proficiency: string;
	classTableGroups?: Array<ClassTableGroup>;
	startingProficiencies: string;
	startingEquipment: string;
	classFeatures?: Array<ClassFeature>;
	featureList?: Array<ClassFeature>;
	subclassTitle: string;
	fluff?: Array<Fluff>;
	extra?: Extra;
  }
  export interface ClassTableGroup {
	colLabels?: Array<string>;
	rows?: Array<Array<string | number | VarData>>;
	title?: string;
  }

  export interface VarData {
	type: string;
	value?: number | string;
	toRoll?: Array<VarDataRollValue>;
  }

  export interface VarDataRollValue {
	number: number;
	faces: number;
  }
  
  export interface ClassFeature {
	name: string;
	entries?: Array<string | Entry>;
	gainSubclassFeature?: boolean;
	type?: string;
	source?: string;
	page?: number;
  }
    
  export interface Entry {
	name?: string | null;
	type: string;
	entries?: Array<string | Entry>;
  }

  export interface Fluff {
	type: string;
	entries?: Array<string | Entry>;
	source?: string;
	page?: number;
	href?: Href;
  }
  
  export interface Href {
	type: string;
	url: string;
  }

  export interface Extra {
	json: string;
	name: string;
  }

  export interface EldritchInvocation {
	name: string;
	prerequisite?: Array<Prerequisite>;
	entries?: Array<string | Entry>;
	source: string;
	page: number;
	featureType: string;
	isClassFeatureVariant?: boolean;
  }

  export interface Prerequisite {
	type: string;
	level?: number | Prerequisite;
	class?: ClassPrerequisite ;
	entries?: Array<string | Entry>;
	entry?: string | Entry;
  }

  export interface ClassPrerequisite {
	name: string;
  }

  export interface Feat {
	name: string;
	source: string;
	page: number;
	otherSources?: Array<Source>;
	prerequisite?: Array<Prerequisite>
	ability?: Array<FeatAbility>;
	entries?: Array<string | Entry>;
	additionalSources?: Array<Source>;
	srd?: boolean;
  }

  export interface Source {
	source: string;
	page: number;
  }
  
  export interface RaceEntity {
	name: string;
	subrace?: SubRace;
	displayEntry?: string;
  }

  export interface Proficiency {
	armor?: string;
	weapon?: string;
  }

  export interface FeatAbility {
	choose?: FeatAbilityChoose;
	str?: number;
	con?: number;
	dex?: number;
	int?: number;
	wis?: number;
	cha?: number;
  }
  export interface FeatAbilityChoose {
	from?: Array<string>;
	amount: number;
	entry?: string;
  }
  
  export interface Background {
	name: string;
	source: string;
	page: number;
	entries?: Array<string | Entry>;
	skillProficiencies?: Array<SkillProficiency>;
	languageProficiencies?: Array<LanguageProficiency>;
	toolProficiencies?: Array<ToolProficiency>;
	additionalSources?: Array<Source>;
	otherSources?: Array<Source>;
	srd?: boolean;
	startingEquipment?: Array<StartingEquipment>;
	hasFluff?: boolean;
	hasFluffImages?: boolean;
  }
  
  export interface SkillProficiency {
	choose?: SkillProficiencyChoose;
  }

  export interface SkillProficiencyChoose {
	from?: Array<string>;
	count?: number;
  }

  export interface ToolProficiency {
	choose?: ToolProficiencyChoose;
  }

  export interface ToolProficiencyChoose {
	from?: Array<string>;
	count?: number;
  }

  export interface StartingEquipment {
	_?: Array<string | Equipment>;
	a?: Array<string | Equipment>;
	b?: Array<string | Equipment>;
  }

  export interface Equipment {
	special?: string;
	equipmentType?: string;
	item?: string;
	quantity?: number;
	containsValue?: number;
  }
  
  export interface BackgroundFluff {
	name: string;
	source: string;
	entries?: Array<string | Entry>;
	images?: Array<Image>;
  }
  
  
  export interface Image {
	type: string;
	href: HrefOrSoundClip;
  }

  export interface HrefOrSoundClip {
	type: string;
	path: string;	
  }

  export interface Race {
	name: string;
	source: string;
	page: number;
	size: string;
	speed: number | Speed;
	ability?: Array<Ability>;
	traitTags?: Array<string>;
	languageProficiencies?: Array<LanguageProficiency>;
	skillProficiencies?: Array<SkillProficiency>;
	entries?: Array<string | Entry>;
	darkvision?: number;
	otherSources?:  Array<Source>;
	additionalSources?:  Array<Source>;
	heightAndWeight?: HeightAndWeight;
	subraces?: Array<SubRace>;
	additionalSpells?: Array<AdditionalSpell>;
	srd?: boolean;
	lineage?: string;
	creatureTypes?: Array<string>;
	hasFluff?: boolean;
	hasFluffImages?: boolean;
	resist?: Array<string>;
	conditionImmune?: Array<string>;
  }

  export interface Speed {
	walk: number;
	swim?: number;
	climb?: number;
  }
  
  export interface Ability {
	cha?: number;
	choose?: AbilityChoose;
	dex?: number;
	con?: number;
	wis?: number;
	int?: number;
	str?: number;
  }

  export interface AbilityChoose {
	from?: Array<string>;
	count: number;
  }

  export interface LanguageProficiency {
	choose?: LanguageProficiencyChoose;
  }

  export interface LanguageProficiencyChoose {
	from?: Array<string>;
	count: number;
  }
  
  export interface HeightAndWeight {
	baseHeight: number;
	heightMod: string;
	baseWeight: number;
	weightMod?: string;
  }

  export interface SubRace {
	name: string;
	page?: number;
	ability?: Array<Ability>;
	traitTags?: Array<string>;
	additionalSpells?: Array<AdditionalSpell>;
	entries?: Array<string | Entry>;
	darkvision?: number;
	speed?: number | Speed;
	skillProficiencies?: Array<SkillProficiency>;
	heightAndWeight?: HeightAndWeight;
	source?: string;
	overwrite?: Overwrite;
	otherSources?: Array<Source>;
	languageProficiencies?: Array<LanguageProficiency>;
	srd?: boolean;
	alias?: Array<string>;
  }
  
  export interface AdditionalSpell {
	innate: Innate;
	expanded?: Expanded;
	ability: string | Ability;
	known?: InnateOrPreparedOrDailyOrKnown;
  }
  export interface Innate {
	1?: Array<string>;
	3?: Array<string>;
	5?: Array<string>;
  }
  export interface Expanded {
	s1?:  Array<string>;
	s2?:  Array<string>;
	s3?:  Array<string>;
	s4?:  Array<string>;
	s5?:  Array<string>;
  }
  export interface InnateOrPreparedOrDailyOrKnown {
	1?: Array<string>;
  }
  
  
  export interface Overwrite {
	traitTags?: boolean;
	languageProficiencies?: boolean;
	ability?: boolean;
	skillProficiencies?: boolean;
  }
  
  export interface RaceFluff {
	name: string;
	source: string;
	entries?: Array<string | Entry>;
	images?: Array<Image>;
	uncommon?: boolean;
  }
  
  export interface ClassSubclasses {
	name: string;
	subclasses?: Subclass;
  }

  export interface Subclass {
	name: string;
	shortName: string;
	source: string;
	page: number;
	subclassFeatures?: Array<SubclassFeature>;
	additionalSpells?: Array<AdditionalSpell>;
	srd?: boolean;
	spellcastingAbility?: string;
	casterProgression?: string;
	subclassTableGroups?: Array<SubclassTableGroup>;
	otherSources?:  Array<Source>;
  }

  export interface SubclassFeature {
	name: string;
	source: string;
	page: number;
	className: string;
	classSource: string;
	subclassShortName: string;
	subclassSource: string;
	level: number;
	entries?: Array<string | Entry>;
	header?: number;
	srd?: boolean;
	isClassFeatureVariant?: boolean;
	otherSources?:  Array<Source>;
  }
  
  export interface SubclassTableGroup {
	subclasses?: Array<Subclass>;
	colLabels?: Array<string>;
	rows?: Array<Array<string | number | VarData>>;
	title?: string;
  }
  
  export interface ArtificerInfusion {
	name: string;
	prerequisite?: Array<Prerequisite>;
	entries?: Array<string | Entry>;
	source: string;
	page: number;
	featureType: string;
	otherSources?:  Array<Source>;
  }
  
  