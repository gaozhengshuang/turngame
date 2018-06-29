type Long = protobuf.Long;

/** Namespace table. */
declare namespace table {

    /** Properties of a TBallGiftbase. */
    interface ITBallGiftbase {

        /** TBallGiftbase TBallGift */
        TBallGift?: (table.ITBallGiftDefine[]|null);
    }

    /** Represents a TBallGiftbase. */
    class TBallGiftbase implements ITBallGiftbase {

        /**
         * Constructs a new TBallGiftbase.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITBallGiftbase);

        /** TBallGiftbase TBallGift. */
        public TBallGift: table.ITBallGiftDefine[];

        /**
         * Creates a new TBallGiftbase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TBallGiftbase instance
         */
        public static create(properties?: table.ITBallGiftbase): table.TBallGiftbase;

        /**
         * Encodes the specified TBallGiftbase message. Does not implicitly {@link table.TBallGiftbase.verify|verify} messages.
         * @param message TBallGiftbase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITBallGiftbase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TBallGiftbase message, length delimited. Does not implicitly {@link table.TBallGiftbase.verify|verify} messages.
         * @param message TBallGiftbase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITBallGiftbase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TBallGiftbase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TBallGiftbase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TBallGiftbase;

        /**
         * Decodes a TBallGiftbase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TBallGiftbase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TBallGiftbase;

        /**
         * Verifies a TBallGiftbase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TBallGiftbase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TBallGiftbase
         */
        public static fromObject(object: { [k: string]: any }): table.TBallGiftbase;

        /**
         * Creates a plain object from a TBallGiftbase message. Also converts values to other types if specified.
         * @param message TBallGiftbase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TBallGiftbase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TBallGiftbase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TBallGiftDefine. */
    interface ITBallGiftDefine {

        /** TBallGiftDefine Id */
        Id?: (number|null);

        /** TBallGiftDefine Name */
        Name?: (string|null);

        /** TBallGiftDefine Num */
        Num?: (number|null);

        /** TBallGiftDefine Path */
        Path?: (string|null);

        /** TBallGiftDefine Pro */
        Pro?: (number|null);

        /** TBallGiftDefine PushBag */
        PushBag?: (number|null);

        /** TBallGiftDefine Info */
        Info?: (string|null);

        /** TBallGiftDefine Cost */
        Cost?: (number|null);
    }

    /** Represents a TBallGiftDefine. */
    class TBallGiftDefine implements ITBallGiftDefine {

        /**
         * Constructs a new TBallGiftDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITBallGiftDefine);

        /** TBallGiftDefine Id. */
        public Id: number;

        /** TBallGiftDefine Name. */
        public Name: string;

        /** TBallGiftDefine Num. */
        public Num: number;

        /** TBallGiftDefine Path. */
        public Path: string;

        /** TBallGiftDefine Pro. */
        public Pro: number;

        /** TBallGiftDefine PushBag. */
        public PushBag: number;

        /** TBallGiftDefine Info. */
        public Info: string;

        /** TBallGiftDefine Cost. */
        public Cost: number;

        /**
         * Creates a new TBallGiftDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TBallGiftDefine instance
         */
        public static create(properties?: table.ITBallGiftDefine): table.TBallGiftDefine;

        /**
         * Encodes the specified TBallGiftDefine message. Does not implicitly {@link table.TBallGiftDefine.verify|verify} messages.
         * @param message TBallGiftDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITBallGiftDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TBallGiftDefine message, length delimited. Does not implicitly {@link table.TBallGiftDefine.verify|verify} messages.
         * @param message TBallGiftDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITBallGiftDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TBallGiftDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TBallGiftDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TBallGiftDefine;

        /**
         * Decodes a TBallGiftDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TBallGiftDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TBallGiftDefine;

        /**
         * Verifies a TBallGiftDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TBallGiftDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TBallGiftDefine
         */
        public static fromObject(object: { [k: string]: any }): table.TBallGiftDefine;

        /**
         * Creates a plain object from a TBallGiftDefine message. Also converts values to other types if specified.
         * @param message TBallGiftDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TBallGiftDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TBallGiftDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DungeonsBase. */
    interface IDungeonsBase {

        /** DungeonsBase TDungeons */
        TDungeons?: (table.ITDungeonsDefine[]|null);
    }

    /** Represents a DungeonsBase. */
    class DungeonsBase implements IDungeonsBase {

        /**
         * Constructs a new DungeonsBase.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.IDungeonsBase);

        /** DungeonsBase TDungeons. */
        public TDungeons: table.ITDungeonsDefine[];

        /**
         * Creates a new DungeonsBase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DungeonsBase instance
         */
        public static create(properties?: table.IDungeonsBase): table.DungeonsBase;

        /**
         * Encodes the specified DungeonsBase message. Does not implicitly {@link table.DungeonsBase.verify|verify} messages.
         * @param message DungeonsBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.IDungeonsBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified DungeonsBase message, length delimited. Does not implicitly {@link table.DungeonsBase.verify|verify} messages.
         * @param message DungeonsBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.IDungeonsBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a DungeonsBase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DungeonsBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.DungeonsBase;

        /**
         * Decodes a DungeonsBase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DungeonsBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.DungeonsBase;

        /**
         * Verifies a DungeonsBase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DungeonsBase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DungeonsBase
         */
        public static fromObject(object: { [k: string]: any }): table.DungeonsBase;

        /**
         * Creates a plain object from a DungeonsBase message. Also converts values to other types if specified.
         * @param message DungeonsBase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.DungeonsBase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DungeonsBase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TDungeonsDefine. */
    interface ITDungeonsDefine {

        /** TDungeonsDefine Id */
        Id?: (number|null);

        /** TDungeonsDefine Rewardid */
        Rewardid?: (number|null);

        /** TDungeonsDefine Type */
        Type?: (number|null);

        /** TDungeonsDefine Mark */
        Mark?: (number|null);

        /** TDungeonsDefine FreeMark */
        FreeMark?: (number|null);

        /** TDungeonsDefine Getnum */
        Getnum?: (number|null);

        /** TDungeonsDefine Rewardnum */
        Rewardnum?: (number|null);

        /** TDungeonsDefine Costid */
        Costid?: (number|null);

        /** TDungeonsDefine Costnum */
        Costnum?: (number|null);

        /** TDungeonsDefine Size */
        Size?: (number|null);

        /** TDungeonsDefine Turntableid */
        Turntableid?: (number|null);

        /** TDungeonsDefine Scorenum */
        Scorenum?: (string[]|null);

        /** TDungeonsDefine Item */
        Item?: (string[]|null);

        /** TDungeonsDefine Adv */
        Adv?: (string[]|null);

        /** TDungeonsDefine Scorelimit */
        Scorelimit?: (number|null);

        /** TDungeonsDefine PersonlLimit */
        PersonlLimit?: (number|null);

        /** TDungeonsDefine MiddleYuanbao */
        MiddleYuanbao?: (string[]|null);

        /** TDungeonsDefine BigYuanbao */
        BigYuanbao?: (string[]|null);

        /** TDungeonsDefine YuanbaoLimit */
        YuanbaoLimit?: (string[]|null);
    }

    /** Represents a TDungeonsDefine. */
    class TDungeonsDefine implements ITDungeonsDefine {

        /**
         * Constructs a new TDungeonsDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITDungeonsDefine);

        /** TDungeonsDefine Id. */
        public Id: number;

        /** TDungeonsDefine Rewardid. */
        public Rewardid: number;

        /** TDungeonsDefine Type. */
        public Type: number;

        /** TDungeonsDefine Mark. */
        public Mark: number;

        /** TDungeonsDefine FreeMark. */
        public FreeMark: number;

        /** TDungeonsDefine Getnum. */
        public Getnum: number;

        /** TDungeonsDefine Rewardnum. */
        public Rewardnum: number;

        /** TDungeonsDefine Costid. */
        public Costid: number;

        /** TDungeonsDefine Costnum. */
        public Costnum: number;

        /** TDungeonsDefine Size. */
        public Size: number;

        /** TDungeonsDefine Turntableid. */
        public Turntableid: number;

        /** TDungeonsDefine Scorenum. */
        public Scorenum: string[];

        /** TDungeonsDefine Item. */
        public Item: string[];

        /** TDungeonsDefine Adv. */
        public Adv: string[];

        /** TDungeonsDefine Scorelimit. */
        public Scorelimit: number;

        /** TDungeonsDefine PersonlLimit. */
        public PersonlLimit: number;

        /** TDungeonsDefine MiddleYuanbao. */
        public MiddleYuanbao: string[];

        /** TDungeonsDefine BigYuanbao. */
        public BigYuanbao: string[];

        /** TDungeonsDefine YuanbaoLimit. */
        public YuanbaoLimit: string[];

        /**
         * Creates a new TDungeonsDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TDungeonsDefine instance
         */
        public static create(properties?: table.ITDungeonsDefine): table.TDungeonsDefine;

        /**
         * Encodes the specified TDungeonsDefine message. Does not implicitly {@link table.TDungeonsDefine.verify|verify} messages.
         * @param message TDungeonsDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITDungeonsDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TDungeonsDefine message, length delimited. Does not implicitly {@link table.TDungeonsDefine.verify|verify} messages.
         * @param message TDungeonsDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITDungeonsDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TDungeonsDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TDungeonsDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TDungeonsDefine;

        /**
         * Decodes a TDungeonsDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TDungeonsDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TDungeonsDefine;

        /**
         * Verifies a TDungeonsDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TDungeonsDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TDungeonsDefine
         */
        public static fromObject(object: { [k: string]: any }): table.TDungeonsDefine;

        /**
         * Creates a plain object from a TDungeonsDefine message. Also converts values to other types if specified.
         * @param message TDungeonsDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TDungeonsDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TDungeonsDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ItemBase. */
    interface IItemBase {

        /** ItemBase ItemBaseData */
        ItemBaseData?: (table.IItemBaseDataDefine[]|null);
    }

    /** Represents an ItemBase. */
    class ItemBase implements IItemBase {

        /**
         * Constructs a new ItemBase.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.IItemBase);

        /** ItemBase ItemBaseData. */
        public ItemBaseData: table.IItemBaseDataDefine[];

        /**
         * Creates a new ItemBase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ItemBase instance
         */
        public static create(properties?: table.IItemBase): table.ItemBase;

        /**
         * Encodes the specified ItemBase message. Does not implicitly {@link table.ItemBase.verify|verify} messages.
         * @param message ItemBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.IItemBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified ItemBase message, length delimited. Does not implicitly {@link table.ItemBase.verify|verify} messages.
         * @param message ItemBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.IItemBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes an ItemBase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ItemBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.ItemBase;

        /**
         * Decodes an ItemBase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ItemBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.ItemBase;

        /**
         * Verifies an ItemBase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ItemBase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ItemBase
         */
        public static fromObject(object: { [k: string]: any }): table.ItemBase;

        /**
         * Creates a plain object from an ItemBase message. Also converts values to other types if specified.
         * @param message ItemBase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.ItemBase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ItemBase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ItemBaseDataDefine. */
    interface IItemBaseDataDefine {

        /** ItemBaseDataDefine Id */
        Id?: (number|null);

        /** ItemBaseDataDefine Name */
        Name?: (string|null);

        /** ItemBaseDataDefine Desc */
        Desc?: (string|null);

        /** ItemBaseDataDefine Sort */
        Sort?: (number|null);

        /** ItemBaseDataDefine Type */
        Type?: (number|null);

        /** ItemBaseDataDefine Sold */
        Sold?: (number|null);
    }

    /** Represents an ItemBaseDataDefine. */
    class ItemBaseDataDefine implements IItemBaseDataDefine {

        /**
         * Constructs a new ItemBaseDataDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.IItemBaseDataDefine);

        /** ItemBaseDataDefine Id. */
        public Id: number;

        /** ItemBaseDataDefine Name. */
        public Name: string;

        /** ItemBaseDataDefine Desc. */
        public Desc: string;

        /** ItemBaseDataDefine Sort. */
        public Sort: number;

        /** ItemBaseDataDefine Type. */
        public Type: number;

        /** ItemBaseDataDefine Sold. */
        public Sold: number;

        /**
         * Creates a new ItemBaseDataDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ItemBaseDataDefine instance
         */
        public static create(properties?: table.IItemBaseDataDefine): table.ItemBaseDataDefine;

        /**
         * Encodes the specified ItemBaseDataDefine message. Does not implicitly {@link table.ItemBaseDataDefine.verify|verify} messages.
         * @param message ItemBaseDataDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.IItemBaseDataDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified ItemBaseDataDefine message, length delimited. Does not implicitly {@link table.ItemBaseDataDefine.verify|verify} messages.
         * @param message ItemBaseDataDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.IItemBaseDataDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes an ItemBaseDataDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ItemBaseDataDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.ItemBaseDataDefine;

        /**
         * Decodes an ItemBaseDataDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ItemBaseDataDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.ItemBaseDataDefine;

        /**
         * Verifies an ItemBaseDataDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ItemBaseDataDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ItemBaseDataDefine
         */
        public static fromObject(object: { [k: string]: any }): table.ItemBaseDataDefine;

        /**
         * Creates a plain object from an ItemBaseDataDefine message. Also converts values to other types if specified.
         * @param message ItemBaseDataDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.ItemBaseDataDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ItemBaseDataDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LevelBasee. */
    interface ILevelBasee {

        /** LevelBasee TLevel */
        TLevel?: (table.ITLevelDefine[]|null);
    }

    /** Represents a LevelBasee. */
    class LevelBasee implements ILevelBasee {

        /**
         * Constructs a new LevelBasee.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ILevelBasee);

        /** LevelBasee TLevel. */
        public TLevel: table.ITLevelDefine[];

        /**
         * Creates a new LevelBasee instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LevelBasee instance
         */
        public static create(properties?: table.ILevelBasee): table.LevelBasee;

        /**
         * Encodes the specified LevelBasee message. Does not implicitly {@link table.LevelBasee.verify|verify} messages.
         * @param message LevelBasee message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ILevelBasee, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified LevelBasee message, length delimited. Does not implicitly {@link table.LevelBasee.verify|verify} messages.
         * @param message LevelBasee message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ILevelBasee, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a LevelBasee message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LevelBasee
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.LevelBasee;

        /**
         * Decodes a LevelBasee message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LevelBasee
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.LevelBasee;

        /**
         * Verifies a LevelBasee message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LevelBasee message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LevelBasee
         */
        public static fromObject(object: { [k: string]: any }): table.LevelBasee;

        /**
         * Creates a plain object from a LevelBasee message. Also converts values to other types if specified.
         * @param message LevelBasee
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.LevelBasee, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LevelBasee to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TLevelDefine. */
    interface ITLevelDefine {

        /** TLevelDefine Id */
        Id?: (number|null);

        /** TLevelDefine ExpNums */
        ExpNums?: (number|null);

        /** TLevelDefine Reward */
        Reward?: (number|null);
    }

    /** Represents a TLevelDefine. */
    class TLevelDefine implements ITLevelDefine {

        /**
         * Constructs a new TLevelDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITLevelDefine);

        /** TLevelDefine Id. */
        public Id: number;

        /** TLevelDefine ExpNums. */
        public ExpNums: number;

        /** TLevelDefine Reward. */
        public Reward: number;

        /**
         * Creates a new TLevelDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TLevelDefine instance
         */
        public static create(properties?: table.ITLevelDefine): table.TLevelDefine;

        /**
         * Encodes the specified TLevelDefine message. Does not implicitly {@link table.TLevelDefine.verify|verify} messages.
         * @param message TLevelDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITLevelDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TLevelDefine message, length delimited. Does not implicitly {@link table.TLevelDefine.verify|verify} messages.
         * @param message TLevelDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITLevelDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TLevelDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TLevelDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TLevelDefine;

        /**
         * Decodes a TLevelDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TLevelDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TLevelDefine;

        /**
         * Verifies a TLevelDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TLevelDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TLevelDefine
         */
        public static fromObject(object: { [k: string]: any }): table.TLevelDefine;

        /**
         * Creates a plain object from a TLevelDefine message. Also converts values to other types if specified.
         * @param message TLevelDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TLevelDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TLevelDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MusicBase. */
    interface IMusicBase {

        /** MusicBase TMusic */
        TMusic?: (table.ITMusicDefine[]|null);
    }

    /** Represents a MusicBase. */
    class MusicBase implements IMusicBase {

        /**
         * Constructs a new MusicBase.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.IMusicBase);

        /** MusicBase TMusic. */
        public TMusic: table.ITMusicDefine[];

        /**
         * Creates a new MusicBase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MusicBase instance
         */
        public static create(properties?: table.IMusicBase): table.MusicBase;

        /**
         * Encodes the specified MusicBase message. Does not implicitly {@link table.MusicBase.verify|verify} messages.
         * @param message MusicBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.IMusicBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified MusicBase message, length delimited. Does not implicitly {@link table.MusicBase.verify|verify} messages.
         * @param message MusicBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.IMusicBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a MusicBase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MusicBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.MusicBase;

        /**
         * Decodes a MusicBase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MusicBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.MusicBase;

        /**
         * Verifies a MusicBase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MusicBase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MusicBase
         */
        public static fromObject(object: { [k: string]: any }): table.MusicBase;

        /**
         * Creates a plain object from a MusicBase message. Also converts values to other types if specified.
         * @param message MusicBase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.MusicBase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MusicBase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TMusicDefine. */
    interface ITMusicDefine {

        /** TMusicDefine Id */
        Id?: (number|null);

        /** TMusicDefine Pos */
        Pos?: (string|null);

        /** TMusicDefine Name */
        Name?: (string|null);
    }

    /** Represents a TMusicDefine. */
    class TMusicDefine implements ITMusicDefine {

        /**
         * Constructs a new TMusicDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITMusicDefine);

        /** TMusicDefine Id. */
        public Id: number;

        /** TMusicDefine Pos. */
        public Pos: string;

        /** TMusicDefine Name. */
        public Name: string;

        /**
         * Creates a new TMusicDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TMusicDefine instance
         */
        public static create(properties?: table.ITMusicDefine): table.TMusicDefine;

        /**
         * Encodes the specified TMusicDefine message. Does not implicitly {@link table.TMusicDefine.verify|verify} messages.
         * @param message TMusicDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITMusicDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TMusicDefine message, length delimited. Does not implicitly {@link table.TMusicDefine.verify|verify} messages.
         * @param message TMusicDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITMusicDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TMusicDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TMusicDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TMusicDefine;

        /**
         * Decodes a TMusicDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TMusicDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TMusicDefine;

        /**
         * Verifies a TMusicDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TMusicDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TMusicDefine
         */
        public static fromObject(object: { [k: string]: any }): table.TMusicDefine;

        /**
         * Creates a plain object from a TMusicDefine message. Also converts values to other types if specified.
         * @param message TMusicDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TMusicDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TMusicDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a NoticeBase. */
    interface INoticeBase {

        /** NoticeBase TNotice */
        TNotice?: (table.ITNoticeDefine[]|null);
    }

    /** Represents a NoticeBase. */
    class NoticeBase implements INoticeBase {

        /**
         * Constructs a new NoticeBase.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.INoticeBase);

        /** NoticeBase TNotice. */
        public TNotice: table.ITNoticeDefine[];

        /**
         * Creates a new NoticeBase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns NoticeBase instance
         */
        public static create(properties?: table.INoticeBase): table.NoticeBase;

        /**
         * Encodes the specified NoticeBase message. Does not implicitly {@link table.NoticeBase.verify|verify} messages.
         * @param message NoticeBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.INoticeBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified NoticeBase message, length delimited. Does not implicitly {@link table.NoticeBase.verify|verify} messages.
         * @param message NoticeBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.INoticeBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a NoticeBase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns NoticeBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.NoticeBase;

        /**
         * Decodes a NoticeBase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns NoticeBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.NoticeBase;

        /**
         * Verifies a NoticeBase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a NoticeBase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns NoticeBase
         */
        public static fromObject(object: { [k: string]: any }): table.NoticeBase;

        /**
         * Creates a plain object from a NoticeBase message. Also converts values to other types if specified.
         * @param message NoticeBase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.NoticeBase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this NoticeBase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TNoticeDefine. */
    interface ITNoticeDefine {

        /** TNoticeDefine Id */
        Id?: (number|null);

        /** TNoticeDefine Avatar */
        Avatar?: (number|null);

        /** TNoticeDefine Info */
        Info?: (string|null);
    }

    /** Represents a TNoticeDefine. */
    class TNoticeDefine implements ITNoticeDefine {

        /**
         * Constructs a new TNoticeDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITNoticeDefine);

        /** TNoticeDefine Id. */
        public Id: number;

        /** TNoticeDefine Avatar. */
        public Avatar: number;

        /** TNoticeDefine Info. */
        public Info: string;

        /**
         * Creates a new TNoticeDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TNoticeDefine instance
         */
        public static create(properties?: table.ITNoticeDefine): table.TNoticeDefine;

        /**
         * Encodes the specified TNoticeDefine message. Does not implicitly {@link table.TNoticeDefine.verify|verify} messages.
         * @param message TNoticeDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITNoticeDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TNoticeDefine message, length delimited. Does not implicitly {@link table.TNoticeDefine.verify|verify} messages.
         * @param message TNoticeDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITNoticeDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TNoticeDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TNoticeDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TNoticeDefine;

        /**
         * Decodes a TNoticeDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TNoticeDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TNoticeDefine;

        /**
         * Verifies a TNoticeDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TNoticeDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TNoticeDefine
         */
        public static fromObject(object: { [k: string]: any }): table.TNoticeDefine;

        /**
         * Creates a plain object from a TNoticeDefine message. Also converts values to other types if specified.
         * @param message TNoticeDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TNoticeDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TNoticeDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ProtoMsgIndex. */
    interface IProtoMsgIndex {

        /** ProtoMsgIndex ProtoId */
        ProtoId?: (table.IProtoIdDefine[]|null);
    }

    /** Represents a ProtoMsgIndex. */
    class ProtoMsgIndex implements IProtoMsgIndex {

        /**
         * Constructs a new ProtoMsgIndex.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.IProtoMsgIndex);

        /** ProtoMsgIndex ProtoId. */
        public ProtoId: table.IProtoIdDefine[];

        /**
         * Creates a new ProtoMsgIndex instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ProtoMsgIndex instance
         */
        public static create(properties?: table.IProtoMsgIndex): table.ProtoMsgIndex;

        /**
         * Encodes the specified ProtoMsgIndex message. Does not implicitly {@link table.ProtoMsgIndex.verify|verify} messages.
         * @param message ProtoMsgIndex message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.IProtoMsgIndex, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified ProtoMsgIndex message, length delimited. Does not implicitly {@link table.ProtoMsgIndex.verify|verify} messages.
         * @param message ProtoMsgIndex message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.IProtoMsgIndex, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a ProtoMsgIndex message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ProtoMsgIndex
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.ProtoMsgIndex;

        /**
         * Decodes a ProtoMsgIndex message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ProtoMsgIndex
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.ProtoMsgIndex;

        /**
         * Verifies a ProtoMsgIndex message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ProtoMsgIndex message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ProtoMsgIndex
         */
        public static fromObject(object: { [k: string]: any }): table.ProtoMsgIndex;

        /**
         * Creates a plain object from a ProtoMsgIndex message. Also converts values to other types if specified.
         * @param message ProtoMsgIndex
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.ProtoMsgIndex, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ProtoMsgIndex to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ProtoIdDefine. */
    interface IProtoIdDefine {

        /** ProtoIdDefine Id */
        Id?: (number|null);

        /** ProtoIdDefine Name */
        Name?: (string|null);
    }

    /** Represents a ProtoIdDefine. */
    class ProtoIdDefine implements IProtoIdDefine {

        /**
         * Constructs a new ProtoIdDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.IProtoIdDefine);

        /** ProtoIdDefine Id. */
        public Id: number;

        /** ProtoIdDefine Name. */
        public Name: string;

        /**
         * Creates a new ProtoIdDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ProtoIdDefine instance
         */
        public static create(properties?: table.IProtoIdDefine): table.ProtoIdDefine;

        /**
         * Encodes the specified ProtoIdDefine message. Does not implicitly {@link table.ProtoIdDefine.verify|verify} messages.
         * @param message ProtoIdDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.IProtoIdDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified ProtoIdDefine message, length delimited. Does not implicitly {@link table.ProtoIdDefine.verify|verify} messages.
         * @param message ProtoIdDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.IProtoIdDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a ProtoIdDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ProtoIdDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.ProtoIdDefine;

        /**
         * Decodes a ProtoIdDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ProtoIdDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.ProtoIdDefine;

        /**
         * Verifies a ProtoIdDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ProtoIdDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ProtoIdDefine
         */
        public static fromObject(object: { [k: string]: any }): table.ProtoIdDefine;

        /**
         * Creates a plain object from a ProtoIdDefine message. Also converts values to other types if specified.
         * @param message ProtoIdDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.ProtoIdDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ProtoIdDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RandomNameBase. */
    interface IRandomNameBase {

        /** RandomNameBase TRandomName */
        TRandomName?: (table.ITRandomNameDefine[]|null);
    }

    /** Represents a RandomNameBase. */
    class RandomNameBase implements IRandomNameBase {

        /**
         * Constructs a new RandomNameBase.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.IRandomNameBase);

        /** RandomNameBase TRandomName. */
        public TRandomName: table.ITRandomNameDefine[];

        /**
         * Creates a new RandomNameBase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RandomNameBase instance
         */
        public static create(properties?: table.IRandomNameBase): table.RandomNameBase;

        /**
         * Encodes the specified RandomNameBase message. Does not implicitly {@link table.RandomNameBase.verify|verify} messages.
         * @param message RandomNameBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.IRandomNameBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified RandomNameBase message, length delimited. Does not implicitly {@link table.RandomNameBase.verify|verify} messages.
         * @param message RandomNameBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.IRandomNameBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a RandomNameBase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RandomNameBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.RandomNameBase;

        /**
         * Decodes a RandomNameBase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RandomNameBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.RandomNameBase;

        /**
         * Verifies a RandomNameBase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RandomNameBase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RandomNameBase
         */
        public static fromObject(object: { [k: string]: any }): table.RandomNameBase;

        /**
         * Creates a plain object from a RandomNameBase message. Also converts values to other types if specified.
         * @param message RandomNameBase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.RandomNameBase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RandomNameBase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TRandomNameDefine. */
    interface ITRandomNameDefine {

        /** TRandomNameDefine Id */
        Id?: (number|null);

        /** TRandomNameDefine Male */
        Male?: (string|null);

        /** TRandomNameDefine Female */
        Female?: (string|null);
    }

    /** Represents a TRandomNameDefine. */
    class TRandomNameDefine implements ITRandomNameDefine {

        /**
         * Constructs a new TRandomNameDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITRandomNameDefine);

        /** TRandomNameDefine Id. */
        public Id: number;

        /** TRandomNameDefine Male. */
        public Male: string;

        /** TRandomNameDefine Female. */
        public Female: string;

        /**
         * Creates a new TRandomNameDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TRandomNameDefine instance
         */
        public static create(properties?: table.ITRandomNameDefine): table.TRandomNameDefine;

        /**
         * Encodes the specified TRandomNameDefine message. Does not implicitly {@link table.TRandomNameDefine.verify|verify} messages.
         * @param message TRandomNameDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITRandomNameDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TRandomNameDefine message, length delimited. Does not implicitly {@link table.TRandomNameDefine.verify|verify} messages.
         * @param message TRandomNameDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITRandomNameDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TRandomNameDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TRandomNameDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TRandomNameDefine;

        /**
         * Decodes a TRandomNameDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TRandomNameDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TRandomNameDefine;

        /**
         * Verifies a TRandomNameDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TRandomNameDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TRandomNameDefine
         */
        public static fromObject(object: { [k: string]: any }): table.TRandomNameDefine;

        /**
         * Creates a plain object from a TRandomNameDefine message. Also converts values to other types if specified.
         * @param message TRandomNameDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TRandomNameDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TRandomNameDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RechargeBase. */
    interface IRechargeBase {

        /** RechargeBase TRecharge */
        TRecharge?: (table.ITRechargeDefine[]|null);
    }

    /** Represents a RechargeBase. */
    class RechargeBase implements IRechargeBase {

        /**
         * Constructs a new RechargeBase.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.IRechargeBase);

        /** RechargeBase TRecharge. */
        public TRecharge: table.ITRechargeDefine[];

        /**
         * Creates a new RechargeBase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RechargeBase instance
         */
        public static create(properties?: table.IRechargeBase): table.RechargeBase;

        /**
         * Encodes the specified RechargeBase message. Does not implicitly {@link table.RechargeBase.verify|verify} messages.
         * @param message RechargeBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.IRechargeBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified RechargeBase message, length delimited. Does not implicitly {@link table.RechargeBase.verify|verify} messages.
         * @param message RechargeBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.IRechargeBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a RechargeBase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RechargeBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.RechargeBase;

        /**
         * Decodes a RechargeBase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RechargeBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.RechargeBase;

        /**
         * Verifies a RechargeBase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RechargeBase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RechargeBase
         */
        public static fromObject(object: { [k: string]: any }): table.RechargeBase;

        /**
         * Creates a plain object from a RechargeBase message. Also converts values to other types if specified.
         * @param message RechargeBase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.RechargeBase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RechargeBase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TRechargeDefine. */
    interface ITRechargeDefine {

        /** TRechargeDefine Id */
        Id?: (number|null);

        /** TRechargeDefine Price */
        Price?: (number|null);
    }

    /** Represents a TRechargeDefine. */
    class TRechargeDefine implements ITRechargeDefine {

        /**
         * Constructs a new TRechargeDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITRechargeDefine);

        /** TRechargeDefine Id. */
        public Id: number;

        /** TRechargeDefine Price. */
        public Price: number;

        /**
         * Creates a new TRechargeDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TRechargeDefine instance
         */
        public static create(properties?: table.ITRechargeDefine): table.TRechargeDefine;

        /**
         * Encodes the specified TRechargeDefine message. Does not implicitly {@link table.TRechargeDefine.verify|verify} messages.
         * @param message TRechargeDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITRechargeDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TRechargeDefine message, length delimited. Does not implicitly {@link table.TRechargeDefine.verify|verify} messages.
         * @param message TRechargeDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITRechargeDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TRechargeDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TRechargeDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TRechargeDefine;

        /**
         * Decodes a TRechargeDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TRechargeDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TRechargeDefine;

        /**
         * Verifies a TRechargeDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TRechargeDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TRechargeDefine
         */
        public static fromObject(object: { [k: string]: any }): table.TRechargeDefine;

        /**
         * Creates a plain object from a TRechargeDefine message. Also converts values to other types if specified.
         * @param message TRechargeDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TRechargeDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TRechargeDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ShopBase. */
    interface IShopBase {

        /** ShopBase TShop */
        TShop?: (table.ITShopDefine[]|null);
    }

    /** Represents a ShopBase. */
    class ShopBase implements IShopBase {

        /**
         * Constructs a new ShopBase.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.IShopBase);

        /** ShopBase TShop. */
        public TShop: table.ITShopDefine[];

        /**
         * Creates a new ShopBase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ShopBase instance
         */
        public static create(properties?: table.IShopBase): table.ShopBase;

        /**
         * Encodes the specified ShopBase message. Does not implicitly {@link table.ShopBase.verify|verify} messages.
         * @param message ShopBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.IShopBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified ShopBase message, length delimited. Does not implicitly {@link table.ShopBase.verify|verify} messages.
         * @param message ShopBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.IShopBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a ShopBase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ShopBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.ShopBase;

        /**
         * Decodes a ShopBase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ShopBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.ShopBase;

        /**
         * Verifies a ShopBase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ShopBase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ShopBase
         */
        public static fromObject(object: { [k: string]: any }): table.ShopBase;

        /**
         * Creates a plain object from a ShopBase message. Also converts values to other types if specified.
         * @param message ShopBase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.ShopBase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ShopBase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TShopDefine. */
    interface ITShopDefine {

        /** TShopDefine Id */
        Id?: (number|null);

        /** TShopDefine Itemid */
        Itemid?: (number|null);

        /** TShopDefine Name */
        Name?: (string|null);

        /** TShopDefine Type */
        Type?: (number|null);

        /** TShopDefine Num */
        Num?: (number|null);

        /** TShopDefine Rmb */
        Rmb?: (number|null);

        /** TShopDefine Price */
        Price?: (number|null);

        /** TShopDefine Send */
        Send?: (number|null);
    }

    /** Represents a TShopDefine. */
    class TShopDefine implements ITShopDefine {

        /**
         * Constructs a new TShopDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITShopDefine);

        /** TShopDefine Id. */
        public Id: number;

        /** TShopDefine Itemid. */
        public Itemid: number;

        /** TShopDefine Name. */
        public Name: string;

        /** TShopDefine Type. */
        public Type: number;

        /** TShopDefine Num. */
        public Num: number;

        /** TShopDefine Rmb. */
        public Rmb: number;

        /** TShopDefine Price. */
        public Price: number;

        /** TShopDefine Send. */
        public Send: number;

        /**
         * Creates a new TShopDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TShopDefine instance
         */
        public static create(properties?: table.ITShopDefine): table.TShopDefine;

        /**
         * Encodes the specified TShopDefine message. Does not implicitly {@link table.TShopDefine.verify|verify} messages.
         * @param message TShopDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITShopDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TShopDefine message, length delimited. Does not implicitly {@link table.TShopDefine.verify|verify} messages.
         * @param message TShopDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITShopDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TShopDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TShopDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TShopDefine;

        /**
         * Decodes a TShopDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TShopDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TShopDefine;

        /**
         * Verifies a TShopDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TShopDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TShopDefine
         */
        public static fromObject(object: { [k: string]: any }): table.TShopDefine;

        /**
         * Creates a plain object from a TShopDefine message. Also converts values to other types if specified.
         * @param message TShopDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TShopDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TShopDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SignBase. */
    interface ISignBase {

        /** SignBase TSign */
        TSign?: (table.ITSignDefine[]|null);
    }

    /** Represents a SignBase. */
    class SignBase implements ISignBase {

        /**
         * Constructs a new SignBase.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ISignBase);

        /** SignBase TSign. */
        public TSign: table.ITSignDefine[];

        /**
         * Creates a new SignBase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SignBase instance
         */
        public static create(properties?: table.ISignBase): table.SignBase;

        /**
         * Encodes the specified SignBase message. Does not implicitly {@link table.SignBase.verify|verify} messages.
         * @param message SignBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ISignBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified SignBase message, length delimited. Does not implicitly {@link table.SignBase.verify|verify} messages.
         * @param message SignBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ISignBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a SignBase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SignBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.SignBase;

        /**
         * Decodes a SignBase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SignBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.SignBase;

        /**
         * Verifies a SignBase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SignBase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SignBase
         */
        public static fromObject(object: { [k: string]: any }): table.SignBase;

        /**
         * Creates a plain object from a SignBase message. Also converts values to other types if specified.
         * @param message SignBase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.SignBase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SignBase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TSignDefine. */
    interface ITSignDefine {

        /** TSignDefine Id */
        Id?: (number|null);

        /** TSignDefine CostId */
        CostId?: (number|null);

        /** TSignDefine Num */
        Num?: (number|null);
    }

    /** Represents a TSignDefine. */
    class TSignDefine implements ITSignDefine {

        /**
         * Constructs a new TSignDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITSignDefine);

        /** TSignDefine Id. */
        public Id: number;

        /** TSignDefine CostId. */
        public CostId: number;

        /** TSignDefine Num. */
        public Num: number;

        /**
         * Creates a new TSignDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TSignDefine instance
         */
        public static create(properties?: table.ITSignDefine): table.TSignDefine;

        /**
         * Encodes the specified TSignDefine message. Does not implicitly {@link table.TSignDefine.verify|verify} messages.
         * @param message TSignDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITSignDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TSignDefine message, length delimited. Does not implicitly {@link table.TSignDefine.verify|verify} messages.
         * @param message TSignDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITSignDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TSignDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TSignDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TSignDefine;

        /**
         * Decodes a TSignDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TSignDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TSignDefine;

        /**
         * Verifies a TSignDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TSignDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TSignDefine
         */
        public static fromObject(object: { [k: string]: any }): table.TSignDefine;

        /**
         * Creates a plain object from a TSignDefine message. Also converts values to other types if specified.
         * @param message TSignDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TSignDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TSignDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TBallBase. */
    interface ITBallBase {

        /** TBallBase TBall */
        TBall?: (table.ITBallDefine[]|null);
    }

    /** Represents a TBallBase. */
    class TBallBase implements ITBallBase {

        /**
         * Constructs a new TBallBase.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITBallBase);

        /** TBallBase TBall. */
        public TBall: table.ITBallDefine[];

        /**
         * Creates a new TBallBase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TBallBase instance
         */
        public static create(properties?: table.ITBallBase): table.TBallBase;

        /**
         * Encodes the specified TBallBase message. Does not implicitly {@link table.TBallBase.verify|verify} messages.
         * @param message TBallBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITBallBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TBallBase message, length delimited. Does not implicitly {@link table.TBallBase.verify|verify} messages.
         * @param message TBallBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITBallBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TBallBase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TBallBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TBallBase;

        /**
         * Decodes a TBallBase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TBallBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TBallBase;

        /**
         * Verifies a TBallBase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TBallBase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TBallBase
         */
        public static fromObject(object: { [k: string]: any }): table.TBallBase;

        /**
         * Creates a plain object from a TBallBase message. Also converts values to other types if specified.
         * @param message TBallBase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TBallBase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TBallBase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TBallDefine. */
    interface ITBallDefine {

        /** TBallDefine Id */
        Id?: (number|null);

        /** TBallDefine Atk */
        Atk?: (number|null);

        /** TBallDefine Price */
        Price?: (number|null);
    }

    /** Represents a TBallDefine. */
    class TBallDefine implements ITBallDefine {

        /**
         * Constructs a new TBallDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITBallDefine);

        /** TBallDefine Id. */
        public Id: number;

        /** TBallDefine Atk. */
        public Atk: number;

        /** TBallDefine Price. */
        public Price: number;

        /**
         * Creates a new TBallDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TBallDefine instance
         */
        public static create(properties?: table.ITBallDefine): table.TBallDefine;

        /**
         * Encodes the specified TBallDefine message. Does not implicitly {@link table.TBallDefine.verify|verify} messages.
         * @param message TBallDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITBallDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TBallDefine message, length delimited. Does not implicitly {@link table.TBallDefine.verify|verify} messages.
         * @param message TBallDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITBallDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TBallDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TBallDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TBallDefine;

        /**
         * Decodes a TBallDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TBallDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TBallDefine;

        /**
         * Verifies a TBallDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TBallDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TBallDefine
         */
        public static fromObject(object: { [k: string]: any }): table.TBallDefine;

        /**
         * Creates a plain object from a TBallDefine message. Also converts values to other types if specified.
         * @param message TBallDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TBallDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TBallDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TbirckInfobase. */
    interface ITbirckInfobase {

        /** TbirckInfobase TBirckInfo */
        TBirckInfo?: (table.ITBirckInfoDefine[]|null);
    }

    /** Represents a TbirckInfobase. */
    class TbirckInfobase implements ITbirckInfobase {

        /**
         * Constructs a new TbirckInfobase.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITbirckInfobase);

        /** TbirckInfobase TBirckInfo. */
        public TBirckInfo: table.ITBirckInfoDefine[];

        /**
         * Creates a new TbirckInfobase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TbirckInfobase instance
         */
        public static create(properties?: table.ITbirckInfobase): table.TbirckInfobase;

        /**
         * Encodes the specified TbirckInfobase message. Does not implicitly {@link table.TbirckInfobase.verify|verify} messages.
         * @param message TbirckInfobase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITbirckInfobase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TbirckInfobase message, length delimited. Does not implicitly {@link table.TbirckInfobase.verify|verify} messages.
         * @param message TbirckInfobase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITbirckInfobase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TbirckInfobase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TbirckInfobase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TbirckInfobase;

        /**
         * Decodes a TbirckInfobase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TbirckInfobase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TbirckInfobase;

        /**
         * Verifies a TbirckInfobase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TbirckInfobase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TbirckInfobase
         */
        public static fromObject(object: { [k: string]: any }): table.TbirckInfobase;

        /**
         * Creates a plain object from a TbirckInfobase message. Also converts values to other types if specified.
         * @param message TbirckInfobase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TbirckInfobase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TbirckInfobase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TBirckInfoDefine. */
    interface ITBirckInfoDefine {

        /** TBirckInfoDefine Id */
        Id?: (number|null);

        /** TBirckInfoDefine Brickid */
        Brickid?: (number|null);

        /** TBirckInfoDefine Info */
        Info?: (string|null);

        /** TBirckInfoDefine Pro */
        Pro?: (number|null);

        /** TBirckInfoDefine Bullet */
        Bullet?: (number|null);

        /** TBirckInfoDefine Time */
        Time?: (number|null);

        /** TBirckInfoDefine kind */
        kind?: (number|null);

        /** TBirckInfoDefine Type */
        Type?: (number|null);
    }

    /** Represents a TBirckInfoDefine. */
    class TBirckInfoDefine implements ITBirckInfoDefine {

        /**
         * Constructs a new TBirckInfoDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITBirckInfoDefine);

        /** TBirckInfoDefine Id. */
        public Id: number;

        /** TBirckInfoDefine Brickid. */
        public Brickid: number;

        /** TBirckInfoDefine Info. */
        public Info: string;

        /** TBirckInfoDefine Pro. */
        public Pro: number;

        /** TBirckInfoDefine Bullet. */
        public Bullet: number;

        /** TBirckInfoDefine Time. */
        public Time: number;

        /** TBirckInfoDefine kind. */
        public kind: number;

        /** TBirckInfoDefine Type. */
        public Type: number;

        /**
         * Creates a new TBirckInfoDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TBirckInfoDefine instance
         */
        public static create(properties?: table.ITBirckInfoDefine): table.TBirckInfoDefine;

        /**
         * Encodes the specified TBirckInfoDefine message. Does not implicitly {@link table.TBirckInfoDefine.verify|verify} messages.
         * @param message TBirckInfoDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITBirckInfoDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TBirckInfoDefine message, length delimited. Does not implicitly {@link table.TBirckInfoDefine.verify|verify} messages.
         * @param message TBirckInfoDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITBirckInfoDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TBirckInfoDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TBirckInfoDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TBirckInfoDefine;

        /**
         * Decodes a TBirckInfoDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TBirckInfoDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TBirckInfoDefine;

        /**
         * Verifies a TBirckInfoDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TBirckInfoDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TBirckInfoDefine
         */
        public static fromObject(object: { [k: string]: any }): table.TBirckInfoDefine;

        /**
         * Creates a plain object from a TBirckInfoDefine message. Also converts values to other types if specified.
         * @param message TBirckInfoDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TBirckInfoDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TBirckInfoDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TBirckItemBase. */
    interface ITBirckItemBase {

        /** TBirckItemBase TBirckItem */
        TBirckItem?: (table.ITBirckItemDefine[]|null);
    }

    /** Represents a TBirckItemBase. */
    class TBirckItemBase implements ITBirckItemBase {

        /**
         * Constructs a new TBirckItemBase.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITBirckItemBase);

        /** TBirckItemBase TBirckItem. */
        public TBirckItem: table.ITBirckItemDefine[];

        /**
         * Creates a new TBirckItemBase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TBirckItemBase instance
         */
        public static create(properties?: table.ITBirckItemBase): table.TBirckItemBase;

        /**
         * Encodes the specified TBirckItemBase message. Does not implicitly {@link table.TBirckItemBase.verify|verify} messages.
         * @param message TBirckItemBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITBirckItemBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TBirckItemBase message, length delimited. Does not implicitly {@link table.TBirckItemBase.verify|verify} messages.
         * @param message TBirckItemBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITBirckItemBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TBirckItemBase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TBirckItemBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TBirckItemBase;

        /**
         * Decodes a TBirckItemBase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TBirckItemBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TBirckItemBase;

        /**
         * Verifies a TBirckItemBase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TBirckItemBase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TBirckItemBase
         */
        public static fromObject(object: { [k: string]: any }): table.TBirckItemBase;

        /**
         * Creates a plain object from a TBirckItemBase message. Also converts values to other types if specified.
         * @param message TBirckItemBase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TBirckItemBase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TBirckItemBase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TBirckItemDefine. */
    interface ITBirckItemDefine {

        /** TBirckItemDefine Id */
        Id?: (number|null);

        /** TBirckItemDefine Name */
        Name?: (string|null);

        /** TBirckItemDefine Num */
        Num?: (number|null);

        /** TBirckItemDefine Pro */
        Pro?: (number|null);
    }

    /** Represents a TBirckItemDefine. */
    class TBirckItemDefine implements ITBirckItemDefine {

        /**
         * Constructs a new TBirckItemDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITBirckItemDefine);

        /** TBirckItemDefine Id. */
        public Id: number;

        /** TBirckItemDefine Name. */
        public Name: string;

        /** TBirckItemDefine Num. */
        public Num: number;

        /** TBirckItemDefine Pro. */
        public Pro: number;

        /**
         * Creates a new TBirckItemDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TBirckItemDefine instance
         */
        public static create(properties?: table.ITBirckItemDefine): table.TBirckItemDefine;

        /**
         * Encodes the specified TBirckItemDefine message. Does not implicitly {@link table.TBirckItemDefine.verify|verify} messages.
         * @param message TBirckItemDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITBirckItemDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TBirckItemDefine message, length delimited. Does not implicitly {@link table.TBirckItemDefine.verify|verify} messages.
         * @param message TBirckItemDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITBirckItemDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TBirckItemDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TBirckItemDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TBirckItemDefine;

        /**
         * Decodes a TBirckItemDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TBirckItemDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TBirckItemDefine;

        /**
         * Verifies a TBirckItemDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TBirckItemDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TBirckItemDefine
         */
        public static fromObject(object: { [k: string]: any }): table.TBirckItemDefine;

        /**
         * Creates a plain object from a TBirckItemDefine message. Also converts values to other types if specified.
         * @param message TBirckItemDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TBirckItemDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TBirckItemDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TbirckRefreshbase. */
    interface ITbirckRefreshbase {

        /** TbirckRefreshbase TBirckRefresh */
        TBirckRefresh?: (table.ITBirckRefreshDefine[]|null);
    }

    /** Represents a TbirckRefreshbase. */
    class TbirckRefreshbase implements ITbirckRefreshbase {

        /**
         * Constructs a new TbirckRefreshbase.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITbirckRefreshbase);

        /** TbirckRefreshbase TBirckRefresh. */
        public TBirckRefresh: table.ITBirckRefreshDefine[];

        /**
         * Creates a new TbirckRefreshbase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TbirckRefreshbase instance
         */
        public static create(properties?: table.ITbirckRefreshbase): table.TbirckRefreshbase;

        /**
         * Encodes the specified TbirckRefreshbase message. Does not implicitly {@link table.TbirckRefreshbase.verify|verify} messages.
         * @param message TbirckRefreshbase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITbirckRefreshbase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TbirckRefreshbase message, length delimited. Does not implicitly {@link table.TbirckRefreshbase.verify|verify} messages.
         * @param message TbirckRefreshbase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITbirckRefreshbase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TbirckRefreshbase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TbirckRefreshbase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TbirckRefreshbase;

        /**
         * Decodes a TbirckRefreshbase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TbirckRefreshbase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TbirckRefreshbase;

        /**
         * Verifies a TbirckRefreshbase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TbirckRefreshbase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TbirckRefreshbase
         */
        public static fromObject(object: { [k: string]: any }): table.TbirckRefreshbase;

        /**
         * Creates a plain object from a TbirckRefreshbase message. Also converts values to other types if specified.
         * @param message TbirckRefreshbase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TbirckRefreshbase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TbirckRefreshbase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TBirckRefreshDefine. */
    interface ITBirckRefreshDefine {

        /** TBirckRefreshDefine Id */
        Id?: (number|null);

        /** TBirckRefreshDefine Min */
        Min?: (number|null);

        /** TBirckRefreshDefine Max */
        Max?: (number|null);

        /** TBirckRefreshDefine Pro */
        Pro?: (string|null);

        /** TBirckRefreshDefine Limitnum */
        Limitnum?: (number|null);
    }

    /** Represents a TBirckRefreshDefine. */
    class TBirckRefreshDefine implements ITBirckRefreshDefine {

        /**
         * Constructs a new TBirckRefreshDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITBirckRefreshDefine);

        /** TBirckRefreshDefine Id. */
        public Id: number;

        /** TBirckRefreshDefine Min. */
        public Min: number;

        /** TBirckRefreshDefine Max. */
        public Max: number;

        /** TBirckRefreshDefine Pro. */
        public Pro: string;

        /** TBirckRefreshDefine Limitnum. */
        public Limitnum: number;

        /**
         * Creates a new TBirckRefreshDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TBirckRefreshDefine instance
         */
        public static create(properties?: table.ITBirckRefreshDefine): table.TBirckRefreshDefine;

        /**
         * Encodes the specified TBirckRefreshDefine message. Does not implicitly {@link table.TBirckRefreshDefine.verify|verify} messages.
         * @param message TBirckRefreshDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITBirckRefreshDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TBirckRefreshDefine message, length delimited. Does not implicitly {@link table.TBirckRefreshDefine.verify|verify} messages.
         * @param message TBirckRefreshDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITBirckRefreshDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TBirckRefreshDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TBirckRefreshDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TBirckRefreshDefine;

        /**
         * Decodes a TBirckRefreshDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TBirckRefreshDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TBirckRefreshDefine;

        /**
         * Verifies a TBirckRefreshDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TBirckRefreshDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TBirckRefreshDefine
         */
        public static fromObject(object: { [k: string]: any }): table.TBirckRefreshDefine;

        /**
         * Creates a plain object from a TBirckRefreshDefine message. Also converts values to other types if specified.
         * @param message TBirckRefreshDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TBirckRefreshDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TBirckRefreshDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TBirckBase. */
    interface ITBirckBase {

        /** TBirckBase TBirck */
        TBirck?: (table.ITBirckDefine[]|null);
    }

    /** Represents a TBirckBase. */
    class TBirckBase implements ITBirckBase {

        /**
         * Constructs a new TBirckBase.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITBirckBase);

        /** TBirckBase TBirck. */
        public TBirck: table.ITBirckDefine[];

        /**
         * Creates a new TBirckBase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TBirckBase instance
         */
        public static create(properties?: table.ITBirckBase): table.TBirckBase;

        /**
         * Encodes the specified TBirckBase message. Does not implicitly {@link table.TBirckBase.verify|verify} messages.
         * @param message TBirckBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITBirckBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TBirckBase message, length delimited. Does not implicitly {@link table.TBirckBase.verify|verify} messages.
         * @param message TBirckBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITBirckBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TBirckBase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TBirckBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TBirckBase;

        /**
         * Decodes a TBirckBase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TBirckBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TBirckBase;

        /**
         * Verifies a TBirckBase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TBirckBase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TBirckBase
         */
        public static fromObject(object: { [k: string]: any }): table.TBirckBase;

        /**
         * Creates a plain object from a TBirckBase message. Also converts values to other types if specified.
         * @param message TBirckBase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TBirckBase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TBirckBase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TBirckDefine. */
    interface ITBirckDefine {

        /** TBirckDefine Id */
        Id?: (number|null);

        /** TBirckDefine High */
        High?: (number|null);

        /** TBirckDefine Wide */
        Wide?: (number|null);
    }

    /** Represents a TBirckDefine. */
    class TBirckDefine implements ITBirckDefine {

        /**
         * Constructs a new TBirckDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITBirckDefine);

        /** TBirckDefine Id. */
        public Id: number;

        /** TBirckDefine High. */
        public High: number;

        /** TBirckDefine Wide. */
        public Wide: number;

        /**
         * Creates a new TBirckDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TBirckDefine instance
         */
        public static create(properties?: table.ITBirckDefine): table.TBirckDefine;

        /**
         * Encodes the specified TBirckDefine message. Does not implicitly {@link table.TBirckDefine.verify|verify} messages.
         * @param message TBirckDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITBirckDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TBirckDefine message, length delimited. Does not implicitly {@link table.TBirckDefine.verify|verify} messages.
         * @param message TBirckDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITBirckDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TBirckDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TBirckDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TBirckDefine;

        /**
         * Decodes a TBirckDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TBirckDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TBirckDefine;

        /**
         * Verifies a TBirckDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TBirckDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TBirckDefine
         */
        public static fromObject(object: { [k: string]: any }): table.TBirckDefine;

        /**
         * Creates a plain object from a TBirckDefine message. Also converts values to other types if specified.
         * @param message TBirckDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TBirckDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TBirckDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TurntableBase. */
    interface ITurntableBase {

        /** TurntableBase TTurntableNew */
        TTurntableNew?: (table.ITTurntableNewDefine[]|null);
    }

    /** Represents a TurntableBase. */
    class TurntableBase implements ITurntableBase {

        /**
         * Constructs a new TurntableBase.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITurntableBase);

        /** TurntableBase TTurntableNew. */
        public TTurntableNew: table.ITTurntableNewDefine[];

        /**
         * Creates a new TurntableBase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TurntableBase instance
         */
        public static create(properties?: table.ITurntableBase): table.TurntableBase;

        /**
         * Encodes the specified TurntableBase message. Does not implicitly {@link table.TurntableBase.verify|verify} messages.
         * @param message TurntableBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITurntableBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TurntableBase message, length delimited. Does not implicitly {@link table.TurntableBase.verify|verify} messages.
         * @param message TurntableBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITurntableBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TurntableBase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TurntableBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TurntableBase;

        /**
         * Decodes a TurntableBase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TurntableBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TurntableBase;

        /**
         * Verifies a TurntableBase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TurntableBase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TurntableBase
         */
        public static fromObject(object: { [k: string]: any }): table.TurntableBase;

        /**
         * Creates a plain object from a TurntableBase message. Also converts values to other types if specified.
         * @param message TurntableBase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TurntableBase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TurntableBase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TTurntableNewDefine. */
    interface ITTurntableNewDefine {

        /** TTurntableNewDefine Id */
        Id?: (number|null);

        /** TTurntableNewDefine Nums */
        Nums?: (string|null);

        /** TTurntableNewDefine Max */
        Max?: (number|null);
    }

    /** Represents a TTurntableNewDefine. */
    class TTurntableNewDefine implements ITTurntableNewDefine {

        /**
         * Constructs a new TTurntableNewDefine.
         * @param [properties] Properties to set
         */
        constructor(properties?: table.ITTurntableNewDefine);

        /** TTurntableNewDefine Id. */
        public Id: number;

        /** TTurntableNewDefine Nums. */
        public Nums: string;

        /** TTurntableNewDefine Max. */
        public Max: number;

        /**
         * Creates a new TTurntableNewDefine instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TTurntableNewDefine instance
         */
        public static create(properties?: table.ITTurntableNewDefine): table.TTurntableNewDefine;

        /**
         * Encodes the specified TTurntableNewDefine message. Does not implicitly {@link table.TTurntableNewDefine.verify|verify} messages.
         * @param message TTurntableNewDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: table.ITTurntableNewDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified TTurntableNewDefine message, length delimited. Does not implicitly {@link table.TTurntableNewDefine.verify|verify} messages.
         * @param message TTurntableNewDefine message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: table.ITTurntableNewDefine, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a TTurntableNewDefine message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TTurntableNewDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): table.TTurntableNewDefine;

        /**
         * Decodes a TTurntableNewDefine message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TTurntableNewDefine
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): table.TTurntableNewDefine;

        /**
         * Verifies a TTurntableNewDefine message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TTurntableNewDefine message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TTurntableNewDefine
         */
        public static fromObject(object: { [k: string]: any }): table.TTurntableNewDefine;

        /**
         * Creates a plain object from a TTurntableNewDefine message. Also converts values to other types if specified.
         * @param message TTurntableNewDefine
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: table.TTurntableNewDefine, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TTurntableNewDefine to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}

/** Namespace msg. */
declare namespace msg {

    /** Properties of an AccountInfo. */
    interface IAccountInfo {

        /** AccountInfo account */
        account?: (string|null);

        /** AccountInfo passwd */
        passwd?: (string|null);

        /** AccountInfo userid */
        userid?: (number|Long|null);
    }

    /** Represents an AccountInfo. */
    class AccountInfo implements IAccountInfo {

        /**
         * Constructs a new AccountInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IAccountInfo);

        /** AccountInfo account. */
        public account: string;

        /** AccountInfo passwd. */
        public passwd: string;

        /** AccountInfo userid. */
        public userid: (number|Long);

        /**
         * Creates a new AccountInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AccountInfo instance
         */
        public static create(properties?: msg.IAccountInfo): msg.AccountInfo;

        /**
         * Encodes the specified AccountInfo message. Does not implicitly {@link msg.AccountInfo.verify|verify} messages.
         * @param message AccountInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IAccountInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified AccountInfo message, length delimited. Does not implicitly {@link msg.AccountInfo.verify|verify} messages.
         * @param message AccountInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IAccountInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes an AccountInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AccountInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.AccountInfo;

        /**
         * Decodes an AccountInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AccountInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.AccountInfo;

        /**
         * Verifies an AccountInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AccountInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AccountInfo
         */
        public static fromObject(object: { [k: string]: any }): msg.AccountInfo;

        /**
         * Creates a plain object from an AccountInfo message. Also converts values to other types if specified.
         * @param message AccountInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.AccountInfo, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AccountInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AccountGateInfo. */
    interface IAccountGateInfo {

        /** AccountGateInfo ip */
        ip?: (string|null);

        /** AccountGateInfo port */
        port?: (number|null);

        /** AccountGateInfo verifykey */
        verifykey?: (string|null);
    }

    /** Represents an AccountGateInfo. */
    class AccountGateInfo implements IAccountGateInfo {

        /**
         * Constructs a new AccountGateInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IAccountGateInfo);

        /** AccountGateInfo ip. */
        public ip: string;

        /** AccountGateInfo port. */
        public port: number;

        /** AccountGateInfo verifykey. */
        public verifykey: string;

        /**
         * Creates a new AccountGateInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AccountGateInfo instance
         */
        public static create(properties?: msg.IAccountGateInfo): msg.AccountGateInfo;

        /**
         * Encodes the specified AccountGateInfo message. Does not implicitly {@link msg.AccountGateInfo.verify|verify} messages.
         * @param message AccountGateInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IAccountGateInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified AccountGateInfo message, length delimited. Does not implicitly {@link msg.AccountGateInfo.verify|verify} messages.
         * @param message AccountGateInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IAccountGateInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes an AccountGateInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AccountGateInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.AccountGateInfo;

        /**
         * Decodes an AccountGateInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AccountGateInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.AccountGateInfo;

        /**
         * Verifies an AccountGateInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AccountGateInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AccountGateInfo
         */
        public static fromObject(object: { [k: string]: any }): msg.AccountGateInfo;

        /**
         * Creates a plain object from an AccountGateInfo message. Also converts values to other types if specified.
         * @param message AccountGateInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.AccountGateInfo, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AccountGateInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BattleUser. */
    interface IBattleUser {

        /** BattleUser userid */
        userid?: (number|Long|null);

        /** BattleUser gold */
        gold?: (number|null);

        /** BattleUser stepindex */
        stepindex?: (number|null);
    }

    /** Represents a BattleUser. */
    class BattleUser implements IBattleUser {

        /**
         * Constructs a new BattleUser.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBattleUser);

        /** BattleUser userid. */
        public userid: (number|Long);

        /** BattleUser gold. */
        public gold: number;

        /** BattleUser stepindex. */
        public stepindex: number;

        /**
         * Creates a new BattleUser instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BattleUser instance
         */
        public static create(properties?: msg.IBattleUser): msg.BattleUser;

        /**
         * Encodes the specified BattleUser message. Does not implicitly {@link msg.BattleUser.verify|verify} messages.
         * @param message BattleUser message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBattleUser, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified BattleUser message, length delimited. Does not implicitly {@link msg.BattleUser.verify|verify} messages.
         * @param message BattleUser message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBattleUser, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a BattleUser message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BattleUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.BattleUser;

        /**
         * Decodes a BattleUser message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BattleUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.BattleUser;

        /**
         * Verifies a BattleUser message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BattleUser message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BattleUser
         */
        public static fromObject(object: { [k: string]: any }): msg.BattleUser;

        /**
         * Creates a plain object from a BattleUser message. Also converts values to other types if specified.
         * @param message BattleUser
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BattleUser, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BattleUser to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GridItem. */
    interface IGridItem {

        /** GridItem index */
        index?: (number|null);

        /** GridItem id */
        id?: (number|null);

        /** GridItem num */
        num?: (number|null);

        /** GridItem gridtype */
        gridtype?: (number|null);

        /** GridItem control */
        control?: (boolean|null);
    }

    /** Represents a GridItem. */
    class GridItem implements IGridItem {

        /**
         * Constructs a new GridItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGridItem);

        /** GridItem index. */
        public index: number;

        /** GridItem id. */
        public id: number;

        /** GridItem num. */
        public num: number;

        /** GridItem gridtype. */
        public gridtype: number;

        /** GridItem control. */
        public control: boolean;

        /**
         * Creates a new GridItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GridItem instance
         */
        public static create(properties?: msg.IGridItem): msg.GridItem;

        /**
         * Encodes the specified GridItem message. Does not implicitly {@link msg.GridItem.verify|verify} messages.
         * @param message GridItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGridItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GridItem message, length delimited. Does not implicitly {@link msg.GridItem.verify|verify} messages.
         * @param message GridItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGridItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GridItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GridItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GridItem;

        /**
         * Decodes a GridItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GridItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GridItem;

        /**
         * Verifies a GridItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GridItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GridItem
         */
        public static fromObject(object: { [k: string]: any }): msg.GridItem;

        /**
         * Creates a plain object from a GridItem message. Also converts values to other types if specified.
         * @param message GridItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GridItem, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GridItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BT_UploadGameUser. */
    interface IBT_UploadGameUser {

        /** BT_UploadGameUser roomid */
        roomid?: (number|Long|null);

        /** BT_UploadGameUser bin */
        bin?: (msg.ISerialize|null);
    }

    /** Represents a BT_UploadGameUser. */
    class BT_UploadGameUser implements IBT_UploadGameUser {

        /**
         * Constructs a new BT_UploadGameUser.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBT_UploadGameUser);

        /** BT_UploadGameUser roomid. */
        public roomid: (number|Long);

        /** BT_UploadGameUser bin. */
        public bin?: (msg.ISerialize|null);

        /**
         * Creates a new BT_UploadGameUser instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BT_UploadGameUser instance
         */
        public static create(properties?: msg.IBT_UploadGameUser): msg.BT_UploadGameUser;

        /**
         * Encodes the specified BT_UploadGameUser message. Does not implicitly {@link msg.BT_UploadGameUser.verify|verify} messages.
         * @param message BT_UploadGameUser message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBT_UploadGameUser, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified BT_UploadGameUser message, length delimited. Does not implicitly {@link msg.BT_UploadGameUser.verify|verify} messages.
         * @param message BT_UploadGameUser message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBT_UploadGameUser, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a BT_UploadGameUser message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BT_UploadGameUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.BT_UploadGameUser;

        /**
         * Decodes a BT_UploadGameUser message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BT_UploadGameUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.BT_UploadGameUser;

        /**
         * Verifies a BT_UploadGameUser message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BT_UploadGameUser message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BT_UploadGameUser
         */
        public static fromObject(object: { [k: string]: any }): msg.BT_UploadGameUser;

        /**
         * Creates a plain object from a BT_UploadGameUser message. Also converts values to other types if specified.
         * @param message BT_UploadGameUser
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BT_UploadGameUser, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BT_UploadGameUser to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BT_ReqEnterRoom. */
    interface IBT_ReqEnterRoom {

        /** BT_ReqEnterRoom roomid */
        roomid?: (number|Long|null);

        /** BT_ReqEnterRoom userid */
        userid?: (number|Long|null);
    }

    /** Represents a BT_ReqEnterRoom. */
    class BT_ReqEnterRoom implements IBT_ReqEnterRoom {

        /**
         * Constructs a new BT_ReqEnterRoom.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBT_ReqEnterRoom);

        /** BT_ReqEnterRoom roomid. */
        public roomid: (number|Long);

        /** BT_ReqEnterRoom userid. */
        public userid: (number|Long);

        /**
         * Creates a new BT_ReqEnterRoom instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BT_ReqEnterRoom instance
         */
        public static create(properties?: msg.IBT_ReqEnterRoom): msg.BT_ReqEnterRoom;

        /**
         * Encodes the specified BT_ReqEnterRoom message. Does not implicitly {@link msg.BT_ReqEnterRoom.verify|verify} messages.
         * @param message BT_ReqEnterRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBT_ReqEnterRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified BT_ReqEnterRoom message, length delimited. Does not implicitly {@link msg.BT_ReqEnterRoom.verify|verify} messages.
         * @param message BT_ReqEnterRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBT_ReqEnterRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a BT_ReqEnterRoom message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BT_ReqEnterRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.BT_ReqEnterRoom;

        /**
         * Decodes a BT_ReqEnterRoom message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BT_ReqEnterRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.BT_ReqEnterRoom;

        /**
         * Verifies a BT_ReqEnterRoom message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BT_ReqEnterRoom message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BT_ReqEnterRoom
         */
        public static fromObject(object: { [k: string]: any }): msg.BT_ReqEnterRoom;

        /**
         * Creates a plain object from a BT_ReqEnterRoom message. Also converts values to other types if specified.
         * @param message BT_ReqEnterRoom
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BT_ReqEnterRoom, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BT_ReqEnterRoom to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BT_GameInit. */
    interface IBT_GameInit {

        /** BT_GameInit roomid */
        roomid?: (number|Long|null);

        /** BT_GameInit ownerid */
        ownerid?: (number|Long|null);

        /** BT_GameInit gamekind */
        gamekind?: (number|null);

        /** BT_GameInit listitem */
        listitem?: (msg.IGridItem[]|null);
    }

    /** Represents a BT_GameInit. */
    class BT_GameInit implements IBT_GameInit {

        /**
         * Constructs a new BT_GameInit.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBT_GameInit);

        /** BT_GameInit roomid. */
        public roomid: (number|Long);

        /** BT_GameInit ownerid. */
        public ownerid: (number|Long);

        /** BT_GameInit gamekind. */
        public gamekind: number;

        /** BT_GameInit listitem. */
        public listitem: msg.IGridItem[];

        /**
         * Creates a new BT_GameInit instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BT_GameInit instance
         */
        public static create(properties?: msg.IBT_GameInit): msg.BT_GameInit;

        /**
         * Encodes the specified BT_GameInit message. Does not implicitly {@link msg.BT_GameInit.verify|verify} messages.
         * @param message BT_GameInit message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBT_GameInit, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified BT_GameInit message, length delimited. Does not implicitly {@link msg.BT_GameInit.verify|verify} messages.
         * @param message BT_GameInit message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBT_GameInit, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a BT_GameInit message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BT_GameInit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.BT_GameInit;

        /**
         * Decodes a BT_GameInit message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BT_GameInit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.BT_GameInit;

        /**
         * Verifies a BT_GameInit message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BT_GameInit message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BT_GameInit
         */
        public static fromObject(object: { [k: string]: any }): msg.BT_GameInit;

        /**
         * Creates a plain object from a BT_GameInit message. Also converts values to other types if specified.
         * @param message BT_GameInit
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BT_GameInit, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BT_GameInit to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BT_SendBattleUser. */
    interface IBT_SendBattleUser {

        /** BT_SendBattleUser ownerid */
        ownerid?: (number|Long|null);

        /** BT_SendBattleUser gold */
        gold?: (number|null);

        /** BT_SendBattleUser coupon */
        coupon?: (number|null);

        /** BT_SendBattleUser yuanbao */
        yuanbao?: (number|null);

        /** BT_SendBattleUser level */
        level?: (number|null);

        /** BT_SendBattleUser freestep */
        freestep?: (number|null);
    }

    /** Represents a BT_SendBattleUser. */
    class BT_SendBattleUser implements IBT_SendBattleUser {

        /**
         * Constructs a new BT_SendBattleUser.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBT_SendBattleUser);

        /** BT_SendBattleUser ownerid. */
        public ownerid: (number|Long);

        /** BT_SendBattleUser gold. */
        public gold: number;

        /** BT_SendBattleUser coupon. */
        public coupon: number;

        /** BT_SendBattleUser yuanbao. */
        public yuanbao: number;

        /** BT_SendBattleUser level. */
        public level: number;

        /** BT_SendBattleUser freestep. */
        public freestep: number;

        /**
         * Creates a new BT_SendBattleUser instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BT_SendBattleUser instance
         */
        public static create(properties?: msg.IBT_SendBattleUser): msg.BT_SendBattleUser;

        /**
         * Encodes the specified BT_SendBattleUser message. Does not implicitly {@link msg.BT_SendBattleUser.verify|verify} messages.
         * @param message BT_SendBattleUser message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBT_SendBattleUser, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified BT_SendBattleUser message, length delimited. Does not implicitly {@link msg.BT_SendBattleUser.verify|verify} messages.
         * @param message BT_SendBattleUser message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBT_SendBattleUser, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a BT_SendBattleUser message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BT_SendBattleUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.BT_SendBattleUser;

        /**
         * Decodes a BT_SendBattleUser message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BT_SendBattleUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.BT_SendBattleUser;

        /**
         * Verifies a BT_SendBattleUser message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BT_SendBattleUser message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BT_SendBattleUser
         */
        public static fromObject(object: { [k: string]: any }): msg.BT_SendBattleUser;

        /**
         * Creates a plain object from a BT_SendBattleUser message. Also converts values to other types if specified.
         * @param message BT_SendBattleUser
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BT_SendBattleUser, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BT_SendBattleUser to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BT_GameStart. */
    interface IBT_GameStart {

        /** BT_GameStart roomid */
        roomid?: (number|Long|null);

        /** BT_GameStart ownerid */
        ownerid?: (number|Long|null);
    }

    /** Represents a BT_GameStart. */
    class BT_GameStart implements IBT_GameStart {

        /**
         * Constructs a new BT_GameStart.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBT_GameStart);

        /** BT_GameStart roomid. */
        public roomid: (number|Long);

        /** BT_GameStart ownerid. */
        public ownerid: (number|Long);

        /**
         * Creates a new BT_GameStart instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BT_GameStart instance
         */
        public static create(properties?: msg.IBT_GameStart): msg.BT_GameStart;

        /**
         * Encodes the specified BT_GameStart message. Does not implicitly {@link msg.BT_GameStart.verify|verify} messages.
         * @param message BT_GameStart message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBT_GameStart, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified BT_GameStart message, length delimited. Does not implicitly {@link msg.BT_GameStart.verify|verify} messages.
         * @param message BT_GameStart message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBT_GameStart, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a BT_GameStart message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BT_GameStart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.BT_GameStart;

        /**
         * Decodes a BT_GameStart message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BT_GameStart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.BT_GameStart;

        /**
         * Verifies a BT_GameStart message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BT_GameStart message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BT_GameStart
         */
        public static fromObject(object: { [k: string]: any }): msg.BT_GameStart;

        /**
         * Creates a plain object from a BT_GameStart message. Also converts values to other types if specified.
         * @param message BT_GameStart
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BT_GameStart, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BT_GameStart to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BT_GameEnd. */
    interface IBT_GameEnd {

        /** BT_GameEnd roomid */
        roomid?: (number|Long|null);

        /** BT_GameEnd ownerid */
        ownerid?: (number|Long|null);

        /** BT_GameEnd reason */
        reason?: (string|null);

        /** BT_GameEnd bin */
        bin?: (msg.ISerialize|null);
    }

    /** Represents a BT_GameEnd. */
    class BT_GameEnd implements IBT_GameEnd {

        /**
         * Constructs a new BT_GameEnd.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBT_GameEnd);

        /** BT_GameEnd roomid. */
        public roomid: (number|Long);

        /** BT_GameEnd ownerid. */
        public ownerid: (number|Long);

        /** BT_GameEnd reason. */
        public reason: string;

        /** BT_GameEnd bin. */
        public bin?: (msg.ISerialize|null);

        /**
         * Creates a new BT_GameEnd instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BT_GameEnd instance
         */
        public static create(properties?: msg.IBT_GameEnd): msg.BT_GameEnd;

        /**
         * Encodes the specified BT_GameEnd message. Does not implicitly {@link msg.BT_GameEnd.verify|verify} messages.
         * @param message BT_GameEnd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBT_GameEnd, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified BT_GameEnd message, length delimited. Does not implicitly {@link msg.BT_GameEnd.verify|verify} messages.
         * @param message BT_GameEnd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBT_GameEnd, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a BT_GameEnd message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BT_GameEnd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.BT_GameEnd;

        /**
         * Decodes a BT_GameEnd message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BT_GameEnd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.BT_GameEnd;

        /**
         * Verifies a BT_GameEnd message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BT_GameEnd message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BT_GameEnd
         */
        public static fromObject(object: { [k: string]: any }): msg.BT_GameEnd;

        /**
         * Creates a plain object from a BT_GameEnd message. Also converts values to other types if specified.
         * @param message BT_GameEnd
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BT_GameEnd, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BT_GameEnd to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BT_GameOver. */
    interface IBT_GameOver {

        /** BT_GameOver roomid */
        roomid?: (number|Long|null);
    }

    /** Represents a BT_GameOver. */
    class BT_GameOver implements IBT_GameOver {

        /**
         * Constructs a new BT_GameOver.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBT_GameOver);

        /** BT_GameOver roomid. */
        public roomid: (number|Long);

        /**
         * Creates a new BT_GameOver instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BT_GameOver instance
         */
        public static create(properties?: msg.IBT_GameOver): msg.BT_GameOver;

        /**
         * Encodes the specified BT_GameOver message. Does not implicitly {@link msg.BT_GameOver.verify|verify} messages.
         * @param message BT_GameOver message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBT_GameOver, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified BT_GameOver message, length delimited. Does not implicitly {@link msg.BT_GameOver.verify|verify} messages.
         * @param message BT_GameOver message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBT_GameOver, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a BT_GameOver message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BT_GameOver
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.BT_GameOver;

        /**
         * Decodes a BT_GameOver message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BT_GameOver
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.BT_GameOver;

        /**
         * Verifies a BT_GameOver message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BT_GameOver message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BT_GameOver
         */
        public static fromObject(object: { [k: string]: any }): msg.BT_GameOver;

        /**
         * Creates a plain object from a BT_GameOver message. Also converts values to other types if specified.
         * @param message BT_GameOver
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BT_GameOver, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BT_GameOver to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BT_JumpPreCheck. */
    interface IBT_JumpPreCheck {

        /** BT_JumpPreCheck roomid */
        roomid?: (number|Long|null);

        /** BT_JumpPreCheck userid */
        userid?: (number|Long|null);

        /** BT_JumpPreCheck token */
        token?: (string|null);
    }

    /** Represents a BT_JumpPreCheck. */
    class BT_JumpPreCheck implements IBT_JumpPreCheck {

        /**
         * Constructs a new BT_JumpPreCheck.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBT_JumpPreCheck);

        /** BT_JumpPreCheck roomid. */
        public roomid: (number|Long);

        /** BT_JumpPreCheck userid. */
        public userid: (number|Long);

        /** BT_JumpPreCheck token. */
        public token: string;

        /**
         * Creates a new BT_JumpPreCheck instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BT_JumpPreCheck instance
         */
        public static create(properties?: msg.IBT_JumpPreCheck): msg.BT_JumpPreCheck;

        /**
         * Encodes the specified BT_JumpPreCheck message. Does not implicitly {@link msg.BT_JumpPreCheck.verify|verify} messages.
         * @param message BT_JumpPreCheck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBT_JumpPreCheck, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified BT_JumpPreCheck message, length delimited. Does not implicitly {@link msg.BT_JumpPreCheck.verify|verify} messages.
         * @param message BT_JumpPreCheck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBT_JumpPreCheck, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a BT_JumpPreCheck message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BT_JumpPreCheck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.BT_JumpPreCheck;

        /**
         * Decodes a BT_JumpPreCheck message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BT_JumpPreCheck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.BT_JumpPreCheck;

        /**
         * Verifies a BT_JumpPreCheck message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BT_JumpPreCheck message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BT_JumpPreCheck
         */
        public static fromObject(object: { [k: string]: any }): msg.BT_JumpPreCheck;

        /**
         * Creates a plain object from a BT_JumpPreCheck message. Also converts values to other types if specified.
         * @param message BT_JumpPreCheck
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BT_JumpPreCheck, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BT_JumpPreCheck to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BT_RetJumpPreCheck. */
    interface IBT_RetJumpPreCheck {

        /** BT_RetJumpPreCheck userid */
        userid?: (number|Long|null);

        /** BT_RetJumpPreCheck errcode */
        errcode?: (string|null);
    }

    /** Represents a BT_RetJumpPreCheck. */
    class BT_RetJumpPreCheck implements IBT_RetJumpPreCheck {

        /**
         * Constructs a new BT_RetJumpPreCheck.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBT_RetJumpPreCheck);

        /** BT_RetJumpPreCheck userid. */
        public userid: (number|Long);

        /** BT_RetJumpPreCheck errcode. */
        public errcode: string;

        /**
         * Creates a new BT_RetJumpPreCheck instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BT_RetJumpPreCheck instance
         */
        public static create(properties?: msg.IBT_RetJumpPreCheck): msg.BT_RetJumpPreCheck;

        /**
         * Encodes the specified BT_RetJumpPreCheck message. Does not implicitly {@link msg.BT_RetJumpPreCheck.verify|verify} messages.
         * @param message BT_RetJumpPreCheck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBT_RetJumpPreCheck, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified BT_RetJumpPreCheck message, length delimited. Does not implicitly {@link msg.BT_RetJumpPreCheck.verify|verify} messages.
         * @param message BT_RetJumpPreCheck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBT_RetJumpPreCheck, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a BT_RetJumpPreCheck message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BT_RetJumpPreCheck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.BT_RetJumpPreCheck;

        /**
         * Decodes a BT_RetJumpPreCheck message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BT_RetJumpPreCheck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.BT_RetJumpPreCheck;

        /**
         * Verifies a BT_RetJumpPreCheck message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BT_RetJumpPreCheck message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BT_RetJumpPreCheck
         */
        public static fromObject(object: { [k: string]: any }): msg.BT_RetJumpPreCheck;

        /**
         * Creates a plain object from a BT_RetJumpPreCheck message. Also converts values to other types if specified.
         * @param message BT_RetJumpPreCheck
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BT_RetJumpPreCheck, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BT_RetJumpPreCheck to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BT_ReqJumpStep. */
    interface IBT_ReqJumpStep {

        /** BT_ReqJumpStep roomid */
        roomid?: (number|Long|null);

        /** BT_ReqJumpStep userid */
        userid?: (number|Long|null);

        /** BT_ReqJumpStep stepnum */
        stepnum?: (number|null);
    }

    /** Represents a BT_ReqJumpStep. */
    class BT_ReqJumpStep implements IBT_ReqJumpStep {

        /**
         * Constructs a new BT_ReqJumpStep.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBT_ReqJumpStep);

        /** BT_ReqJumpStep roomid. */
        public roomid: (number|Long);

        /** BT_ReqJumpStep userid. */
        public userid: (number|Long);

        /** BT_ReqJumpStep stepnum. */
        public stepnum: number;

        /**
         * Creates a new BT_ReqJumpStep instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BT_ReqJumpStep instance
         */
        public static create(properties?: msg.IBT_ReqJumpStep): msg.BT_ReqJumpStep;

        /**
         * Encodes the specified BT_ReqJumpStep message. Does not implicitly {@link msg.BT_ReqJumpStep.verify|verify} messages.
         * @param message BT_ReqJumpStep message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBT_ReqJumpStep, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified BT_ReqJumpStep message, length delimited. Does not implicitly {@link msg.BT_ReqJumpStep.verify|verify} messages.
         * @param message BT_ReqJumpStep message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBT_ReqJumpStep, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a BT_ReqJumpStep message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BT_ReqJumpStep
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.BT_ReqJumpStep;

        /**
         * Decodes a BT_ReqJumpStep message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BT_ReqJumpStep
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.BT_ReqJumpStep;

        /**
         * Verifies a BT_ReqJumpStep message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BT_ReqJumpStep message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BT_ReqJumpStep
         */
        public static fromObject(object: { [k: string]: any }): msg.BT_ReqJumpStep;

        /**
         * Creates a plain object from a BT_ReqJumpStep message. Also converts values to other types if specified.
         * @param message BT_ReqJumpStep
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BT_ReqJumpStep, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BT_ReqJumpStep to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BT_RetJumpStep. */
    interface IBT_RetJumpStep {

        /** BT_RetJumpStep userid */
        userid?: (number|Long|null);

        /** BT_RetJumpStep stepindex */
        stepindex?: (number|null);

        /** BT_RetJumpStep fakelist */
        fakelist?: (number[]|null);
    }

    /** Represents a BT_RetJumpStep. */
    class BT_RetJumpStep implements IBT_RetJumpStep {

        /**
         * Constructs a new BT_RetJumpStep.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBT_RetJumpStep);

        /** BT_RetJumpStep userid. */
        public userid: (number|Long);

        /** BT_RetJumpStep stepindex. */
        public stepindex: number;

        /** BT_RetJumpStep fakelist. */
        public fakelist: number[];

        /**
         * Creates a new BT_RetJumpStep instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BT_RetJumpStep instance
         */
        public static create(properties?: msg.IBT_RetJumpStep): msg.BT_RetJumpStep;

        /**
         * Encodes the specified BT_RetJumpStep message. Does not implicitly {@link msg.BT_RetJumpStep.verify|verify} messages.
         * @param message BT_RetJumpStep message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBT_RetJumpStep, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified BT_RetJumpStep message, length delimited. Does not implicitly {@link msg.BT_RetJumpStep.verify|verify} messages.
         * @param message BT_RetJumpStep message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBT_RetJumpStep, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a BT_RetJumpStep message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BT_RetJumpStep
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.BT_RetJumpStep;

        /**
         * Decodes a BT_RetJumpStep message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BT_RetJumpStep
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.BT_RetJumpStep;

        /**
         * Verifies a BT_RetJumpStep message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BT_RetJumpStep message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BT_RetJumpStep
         */
        public static fromObject(object: { [k: string]: any }): msg.BT_RetJumpStep;

        /**
         * Creates a plain object from a BT_RetJumpStep message. Also converts values to other types if specified.
         * @param message BT_RetJumpStep
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BT_RetJumpStep, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BT_RetJumpStep to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BT_ReqQuitGameRoom. */
    interface IBT_ReqQuitGameRoom {

        /** BT_ReqQuitGameRoom roomid */
        roomid?: (number|Long|null);

        /** BT_ReqQuitGameRoom userid */
        userid?: (number|Long|null);
    }

    /** Represents a BT_ReqQuitGameRoom. */
    class BT_ReqQuitGameRoom implements IBT_ReqQuitGameRoom {

        /**
         * Constructs a new BT_ReqQuitGameRoom.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBT_ReqQuitGameRoom);

        /** BT_ReqQuitGameRoom roomid. */
        public roomid: (number|Long);

        /** BT_ReqQuitGameRoom userid. */
        public userid: (number|Long);

        /**
         * Creates a new BT_ReqQuitGameRoom instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BT_ReqQuitGameRoom instance
         */
        public static create(properties?: msg.IBT_ReqQuitGameRoom): msg.BT_ReqQuitGameRoom;

        /**
         * Encodes the specified BT_ReqQuitGameRoom message. Does not implicitly {@link msg.BT_ReqQuitGameRoom.verify|verify} messages.
         * @param message BT_ReqQuitGameRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBT_ReqQuitGameRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified BT_ReqQuitGameRoom message, length delimited. Does not implicitly {@link msg.BT_ReqQuitGameRoom.verify|verify} messages.
         * @param message BT_ReqQuitGameRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBT_ReqQuitGameRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a BT_ReqQuitGameRoom message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BT_ReqQuitGameRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.BT_ReqQuitGameRoom;

        /**
         * Decodes a BT_ReqQuitGameRoom message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BT_ReqQuitGameRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.BT_ReqQuitGameRoom;

        /**
         * Verifies a BT_ReqQuitGameRoom message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BT_ReqQuitGameRoom message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BT_ReqQuitGameRoom
         */
        public static fromObject(object: { [k: string]: any }): msg.BT_ReqQuitGameRoom;

        /**
         * Creates a plain object from a BT_ReqQuitGameRoom message. Also converts values to other types if specified.
         * @param message BT_ReqQuitGameRoom
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BT_ReqQuitGameRoom, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BT_ReqQuitGameRoom to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BT_PickItem. */
    interface IBT_PickItem {

        /** BT_PickItem userid */
        userid?: (number|Long|null);

        /** BT_PickItem item */
        item?: (msg.IGridItem|null);
    }

    /** Represents a BT_PickItem. */
    class BT_PickItem implements IBT_PickItem {

        /**
         * Constructs a new BT_PickItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBT_PickItem);

        /** BT_PickItem userid. */
        public userid: (number|Long);

        /** BT_PickItem item. */
        public item?: (msg.IGridItem|null);

        /**
         * Creates a new BT_PickItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BT_PickItem instance
         */
        public static create(properties?: msg.IBT_PickItem): msg.BT_PickItem;

        /**
         * Encodes the specified BT_PickItem message. Does not implicitly {@link msg.BT_PickItem.verify|verify} messages.
         * @param message BT_PickItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBT_PickItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified BT_PickItem message, length delimited. Does not implicitly {@link msg.BT_PickItem.verify|verify} messages.
         * @param message BT_PickItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBT_PickItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a BT_PickItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BT_PickItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.BT_PickItem;

        /**
         * Decodes a BT_PickItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BT_PickItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.BT_PickItem;

        /**
         * Verifies a BT_PickItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BT_PickItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BT_PickItem
         */
        public static fromObject(object: { [k: string]: any }): msg.BT_PickItem;

        /**
         * Creates a plain object from a BT_PickItem message. Also converts values to other types if specified.
         * @param message BT_PickItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BT_PickItem, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BT_PickItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EntityBase. */
    interface IEntityBase {

        /** EntityBase id */
        id?: (number|Long|null);

        /** EntityBase name */
        name?: (string|null);

        /** EntityBase face */
        face?: (string|null);

        /** EntityBase sex */
        sex?: (number|null);

        /** EntityBase account */
        account?: (string|null);
    }

    /** Represents an EntityBase. */
    class EntityBase implements IEntityBase {

        /**
         * Constructs a new EntityBase.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IEntityBase);

        /** EntityBase id. */
        public id: (number|Long);

        /** EntityBase name. */
        public name: string;

        /** EntityBase face. */
        public face: string;

        /** EntityBase sex. */
        public sex: number;

        /** EntityBase account. */
        public account: string;

        /**
         * Creates a new EntityBase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EntityBase instance
         */
        public static create(properties?: msg.IEntityBase): msg.EntityBase;

        /**
         * Encodes the specified EntityBase message. Does not implicitly {@link msg.EntityBase.verify|verify} messages.
         * @param message EntityBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IEntityBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified EntityBase message, length delimited. Does not implicitly {@link msg.EntityBase.verify|verify} messages.
         * @param message EntityBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IEntityBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes an EntityBase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EntityBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.EntityBase;

        /**
         * Decodes an EntityBase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EntityBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.EntityBase;

        /**
         * Verifies an EntityBase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EntityBase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EntityBase
         */
        public static fromObject(object: { [k: string]: any }): msg.EntityBase;

        /**
         * Creates a plain object from an EntityBase message. Also converts values to other types if specified.
         * @param message EntityBase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.EntityBase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EntityBase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SimpleCounter. */
    interface ISimpleCounter {

        /** SimpleCounter freestep */
        freestep?: (number|null);

        /** SimpleCounter givestep */
        givestep?: (number|Long|null);
    }

    /** Represents a SimpleCounter. */
    class SimpleCounter implements ISimpleCounter {

        /**
         * Constructs a new SimpleCounter.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ISimpleCounter);

        /** SimpleCounter freestep. */
        public freestep: number;

        /** SimpleCounter givestep. */
        public givestep: (number|Long);

        /**
         * Creates a new SimpleCounter instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SimpleCounter instance
         */
        public static create(properties?: msg.ISimpleCounter): msg.SimpleCounter;

        /**
         * Encodes the specified SimpleCounter message. Does not implicitly {@link msg.SimpleCounter.verify|verify} messages.
         * @param message SimpleCounter message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ISimpleCounter, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified SimpleCounter message, length delimited. Does not implicitly {@link msg.SimpleCounter.verify|verify} messages.
         * @param message SimpleCounter message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ISimpleCounter, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a SimpleCounter message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SimpleCounter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.SimpleCounter;

        /**
         * Decodes a SimpleCounter message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SimpleCounter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.SimpleCounter;

        /**
         * Verifies a SimpleCounter message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SimpleCounter message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SimpleCounter
         */
        public static fromObject(object: { [k: string]: any }): msg.SimpleCounter;

        /**
         * Creates a plain object from a SimpleCounter message. Also converts values to other types if specified.
         * @param message SimpleCounter
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.SimpleCounter, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SimpleCounter to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserBase. */
    interface IUserBase {

        /** UserBase level */
        level?: (number|null);

        /** UserBase exp */
        exp?: (number|null);

        /** UserBase money */
        money?: (number|null);

        /** UserBase coupon */
        coupon?: (number|null);

        /** UserBase yuanbao */
        yuanbao?: (number|null);

        /** UserBase tmlogin */
        tmlogin?: (number|Long|null);

        /** UserBase tmlogout */
        tmlogout?: (number|Long|null);

        /** UserBase continuelogin */
        continuelogin?: (number|null);

        /** UserBase nocountlogin */
        nocountlogin?: (number|null);

        /** UserBase signreward */
        signreward?: (number|null);

        /** UserBase signtime */
        signtime?: (number|null);

        /** UserBase addrlist */
        addrlist?: (msg.IUserAddress[]|null);

        /** UserBase scounter */
        scounter?: (msg.ISimpleCounter|null);
    }

    /** Represents a UserBase. */
    class UserBase implements IUserBase {

        /**
         * Constructs a new UserBase.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IUserBase);

        /** UserBase level. */
        public level: number;

        /** UserBase exp. */
        public exp: number;

        /** UserBase money. */
        public money: number;

        /** UserBase coupon. */
        public coupon: number;

        /** UserBase yuanbao. */
        public yuanbao: number;

        /** UserBase tmlogin. */
        public tmlogin: (number|Long);

        /** UserBase tmlogout. */
        public tmlogout: (number|Long);

        /** UserBase continuelogin. */
        public continuelogin: number;

        /** UserBase nocountlogin. */
        public nocountlogin: number;

        /** UserBase signreward. */
        public signreward: number;

        /** UserBase signtime. */
        public signtime: number;

        /** UserBase addrlist. */
        public addrlist: msg.IUserAddress[];

        /** UserBase scounter. */
        public scounter?: (msg.ISimpleCounter|null);

        /**
         * Creates a new UserBase instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserBase instance
         */
        public static create(properties?: msg.IUserBase): msg.UserBase;

        /**
         * Encodes the specified UserBase message. Does not implicitly {@link msg.UserBase.verify|verify} messages.
         * @param message UserBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IUserBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified UserBase message, length delimited. Does not implicitly {@link msg.UserBase.verify|verify} messages.
         * @param message UserBase message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IUserBase, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a UserBase message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.UserBase;

        /**
         * Decodes a UserBase message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserBase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.UserBase;

        /**
         * Verifies a UserBase message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserBase message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserBase
         */
        public static fromObject(object: { [k: string]: any }): msg.UserBase;

        /**
         * Creates a plain object from a UserBase message. Also converts values to other types if specified.
         * @param message UserBase
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.UserBase, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserBase to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserAddress. */
    interface IUserAddress {

        /** UserAddress receiver */
        receiver?: (string|null);

        /** UserAddress phone */
        phone?: (string|null);

        /** UserAddress address */
        address?: (string|null);
    }

    /** Represents a UserAddress. */
    class UserAddress implements IUserAddress {

        /**
         * Constructs a new UserAddress.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IUserAddress);

        /** UserAddress receiver. */
        public receiver: string;

        /** UserAddress phone. */
        public phone: string;

        /** UserAddress address. */
        public address: string;

        /**
         * Creates a new UserAddress instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserAddress instance
         */
        public static create(properties?: msg.IUserAddress): msg.UserAddress;

        /**
         * Encodes the specified UserAddress message. Does not implicitly {@link msg.UserAddress.verify|verify} messages.
         * @param message UserAddress message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IUserAddress, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified UserAddress message, length delimited. Does not implicitly {@link msg.UserAddress.verify|verify} messages.
         * @param message UserAddress message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IUserAddress, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a UserAddress message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserAddress
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.UserAddress;

        /**
         * Decodes a UserAddress message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserAddress
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.UserAddress;

        /**
         * Verifies a UserAddress message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserAddress message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserAddress
         */
        public static fromObject(object: { [k: string]: any }): msg.UserAddress;

        /**
         * Creates a plain object from a UserAddress message. Also converts values to other types if specified.
         * @param message UserAddress
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.UserAddress, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserAddress to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** ItemPos enum. */
    enum ItemPos {
        Bag = 0,
        Storage = 1
    }

    /** Properties of an ItemData. */
    interface IItemData {

        /** ItemData id */
        id?: (number|null);

        /** ItemData num */
        num?: (number|null);

        /** ItemData pos */
        pos?: (number|null);
    }

    /** Represents an ItemData. */
    class ItemData implements IItemData {

        /**
         * Constructs a new ItemData.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IItemData);

        /** ItemData id. */
        public id: number;

        /** ItemData num. */
        public num: number;

        /** ItemData pos. */
        public pos: number;

        /**
         * Creates a new ItemData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ItemData instance
         */
        public static create(properties?: msg.IItemData): msg.ItemData;

        /**
         * Encodes the specified ItemData message. Does not implicitly {@link msg.ItemData.verify|verify} messages.
         * @param message ItemData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IItemData, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified ItemData message, length delimited. Does not implicitly {@link msg.ItemData.verify|verify} messages.
         * @param message ItemData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IItemData, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes an ItemData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ItemData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.ItemData;

        /**
         * Decodes an ItemData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ItemData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.ItemData;

        /**
         * Verifies an ItemData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ItemData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ItemData
         */
        public static fromObject(object: { [k: string]: any }): msg.ItemData;

        /**
         * Creates a plain object from an ItemData message. Also converts values to other types if specified.
         * @param message ItemData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.ItemData, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ItemData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ItemBin. */
    interface IItemBin {

        /** ItemBin items */
        items?: (msg.IItemData[]|null);
    }

    /** Represents an ItemBin. */
    class ItemBin implements IItemBin {

        /**
         * Constructs a new ItemBin.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IItemBin);

        /** ItemBin items. */
        public items: msg.IItemData[];

        /**
         * Creates a new ItemBin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ItemBin instance
         */
        public static create(properties?: msg.IItemBin): msg.ItemBin;

        /**
         * Encodes the specified ItemBin message. Does not implicitly {@link msg.ItemBin.verify|verify} messages.
         * @param message ItemBin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IItemBin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified ItemBin message, length delimited. Does not implicitly {@link msg.ItemBin.verify|verify} messages.
         * @param message ItemBin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IItemBin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes an ItemBin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ItemBin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.ItemBin;

        /**
         * Decodes an ItemBin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ItemBin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.ItemBin;

        /**
         * Verifies an ItemBin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ItemBin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ItemBin
         */
        public static fromObject(object: { [k: string]: any }): msg.ItemBin;

        /**
         * Creates a plain object from an ItemBin message. Also converts values to other types if specified.
         * @param message ItemBin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.ItemBin, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ItemBin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Serialize. */
    interface ISerialize {

        /** Serialize entity */
        entity?: (msg.IEntityBase|null);

        /** Serialize base */
        base?: (msg.IUserBase|null);

        /** Serialize item */
        item?: (msg.IItemBin|null);
    }

    /** Represents a Serialize. */
    class Serialize implements ISerialize {

        /**
         * Constructs a new Serialize.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ISerialize);

        /** Serialize entity. */
        public entity?: (msg.IEntityBase|null);

        /** Serialize base. */
        public base?: (msg.IUserBase|null);

        /** Serialize item. */
        public item?: (msg.IItemBin|null);

        /**
         * Creates a new Serialize instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Serialize instance
         */
        public static create(properties?: msg.ISerialize): msg.Serialize;

        /**
         * Encodes the specified Serialize message. Does not implicitly {@link msg.Serialize.verify|verify} messages.
         * @param message Serialize message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ISerialize, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified Serialize message, length delimited. Does not implicitly {@link msg.Serialize.verify|verify} messages.
         * @param message Serialize message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ISerialize, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a Serialize message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Serialize
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.Serialize;

        /**
         * Decodes a Serialize message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Serialize
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.Serialize;

        /**
         * Verifies a Serialize message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Serialize message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Serialize
         */
        public static fromObject(object: { [k: string]: any }): msg.Serialize;

        /**
         * Creates a plain object from a Serialize message. Also converts values to other types if specified.
         * @param message Serialize
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.Serialize, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Serialize to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** SortType enum. */
    enum SortType {
        SortSorce = 1
    }

    /** Properties of a C2GW_UpdateScore. */
    interface IC2GW_UpdateScore {

        /** C2GW_UpdateScore id */
        id?: (number|null);

        /** C2GW_UpdateScore score */
        score?: (number|null);

        /** C2GW_UpdateScore type */
        type?: (number|null);
    }

    /** Represents a C2GW_UpdateScore. */
    class C2GW_UpdateScore implements IC2GW_UpdateScore {

        /**
         * Constructs a new C2GW_UpdateScore.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_UpdateScore);

        /** C2GW_UpdateScore id. */
        public id: number;

        /** C2GW_UpdateScore score. */
        public score: number;

        /** C2GW_UpdateScore type. */
        public type: number;

        /**
         * Creates a new C2GW_UpdateScore instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_UpdateScore instance
         */
        public static create(properties?: msg.IC2GW_UpdateScore): msg.C2GW_UpdateScore;

        /**
         * Encodes the specified C2GW_UpdateScore message. Does not implicitly {@link msg.C2GW_UpdateScore.verify|verify} messages.
         * @param message C2GW_UpdateScore message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_UpdateScore, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_UpdateScore message, length delimited. Does not implicitly {@link msg.C2GW_UpdateScore.verify|verify} messages.
         * @param message C2GW_UpdateScore message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_UpdateScore, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_UpdateScore message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_UpdateScore
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_UpdateScore;

        /**
         * Decodes a C2GW_UpdateScore message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_UpdateScore
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_UpdateScore;

        /**
         * Verifies a C2GW_UpdateScore message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_UpdateScore message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_UpdateScore
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_UpdateScore;

        /**
         * Creates a plain object from a C2GW_UpdateScore message. Also converts values to other types if specified.
         * @param message C2GW_UpdateScore
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_UpdateScore, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_UpdateScore to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SortInfo. */
    interface ISortInfo {

        /** SortInfo id */
        id?: (number|null);

        /** SortInfo name */
        name?: (string|null);

        /** SortInfo face */
        face?: (string|null);

        /** SortInfo score */
        score?: (number|null);

        /** SortInfo rank */
        rank?: (number|null);
    }

    /** Represents a SortInfo. */
    class SortInfo implements ISortInfo {

        /**
         * Constructs a new SortInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ISortInfo);

        /** SortInfo id. */
        public id: number;

        /** SortInfo name. */
        public name: string;

        /** SortInfo face. */
        public face: string;

        /** SortInfo score. */
        public score: number;

        /** SortInfo rank. */
        public rank: number;

        /**
         * Creates a new SortInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SortInfo instance
         */
        public static create(properties?: msg.ISortInfo): msg.SortInfo;

        /**
         * Encodes the specified SortInfo message. Does not implicitly {@link msg.SortInfo.verify|verify} messages.
         * @param message SortInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ISortInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified SortInfo message, length delimited. Does not implicitly {@link msg.SortInfo.verify|verify} messages.
         * @param message SortInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ISortInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a SortInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SortInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.SortInfo;

        /**
         * Decodes a SortInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SortInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.SortInfo;

        /**
         * Verifies a SortInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SortInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SortInfo
         */
        public static fromObject(object: { [k: string]: any }): msg.SortInfo;

        /**
         * Creates a plain object from a SortInfo message. Also converts values to other types if specified.
         * @param message SortInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.SortInfo, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SortInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_SortNearBy. */
    interface IGW2C_SortNearBy {

        /** GW2C_SortNearBy type */
        type?: (number|null);

        /** GW2C_SortNearBy list */
        list?: (msg.ISortInfo[]|null);
    }

    /** Represents a GW2C_SortNearBy. */
    class GW2C_SortNearBy implements IGW2C_SortNearBy {

        /**
         * Constructs a new GW2C_SortNearBy.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_SortNearBy);

        /** GW2C_SortNearBy type. */
        public type: number;

        /** GW2C_SortNearBy list. */
        public list: msg.ISortInfo[];

        /**
         * Creates a new GW2C_SortNearBy instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_SortNearBy instance
         */
        public static create(properties?: msg.IGW2C_SortNearBy): msg.GW2C_SortNearBy;

        /**
         * Encodes the specified GW2C_SortNearBy message. Does not implicitly {@link msg.GW2C_SortNearBy.verify|verify} messages.
         * @param message GW2C_SortNearBy message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_SortNearBy, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_SortNearBy message, length delimited. Does not implicitly {@link msg.GW2C_SortNearBy.verify|verify} messages.
         * @param message GW2C_SortNearBy message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_SortNearBy, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_SortNearBy message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_SortNearBy
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_SortNearBy;

        /**
         * Decodes a GW2C_SortNearBy message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_SortNearBy
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_SortNearBy;

        /**
         * Verifies a GW2C_SortNearBy message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_SortNearBy message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_SortNearBy
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_SortNearBy;

        /**
         * Creates a plain object from a GW2C_SortNearBy message. Also converts values to other types if specified.
         * @param message GW2C_SortNearBy
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_SortNearBy, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_SortNearBy to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_ReqSort. */
    interface IC2GW_ReqSort {

        /** C2GW_ReqSort type */
        type?: (number|null);

        /** C2GW_ReqSort begin */
        begin?: (number|null);

        /** C2GW_ReqSort end */
        end?: (number|null);
    }

    /** Represents a C2GW_ReqSort. */
    class C2GW_ReqSort implements IC2GW_ReqSort {

        /**
         * Constructs a new C2GW_ReqSort.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_ReqSort);

        /** C2GW_ReqSort type. */
        public type: number;

        /** C2GW_ReqSort begin. */
        public begin: number;

        /** C2GW_ReqSort end. */
        public end: number;

        /**
         * Creates a new C2GW_ReqSort instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_ReqSort instance
         */
        public static create(properties?: msg.IC2GW_ReqSort): msg.C2GW_ReqSort;

        /**
         * Encodes the specified C2GW_ReqSort message. Does not implicitly {@link msg.C2GW_ReqSort.verify|verify} messages.
         * @param message C2GW_ReqSort message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_ReqSort, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_ReqSort message, length delimited. Does not implicitly {@link msg.C2GW_ReqSort.verify|verify} messages.
         * @param message C2GW_ReqSort message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_ReqSort, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_ReqSort message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_ReqSort
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_ReqSort;

        /**
         * Decodes a C2GW_ReqSort message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_ReqSort
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_ReqSort;

        /**
         * Verifies a C2GW_ReqSort message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_ReqSort message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_ReqSort
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_ReqSort;

        /**
         * Creates a plain object from a C2GW_ReqSort message. Also converts values to other types if specified.
         * @param message C2GW_ReqSort
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_ReqSort, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_ReqSort to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_RetSort. */
    interface IGW2C_RetSort {

        /** GW2C_RetSort type */
        type?: (number|null);

        /** GW2C_RetSort list */
        list?: (msg.ISortInfo[]|null);
    }

    /** Represents a GW2C_RetSort. */
    class GW2C_RetSort implements IGW2C_RetSort {

        /**
         * Constructs a new GW2C_RetSort.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_RetSort);

        /** GW2C_RetSort type. */
        public type: number;

        /** GW2C_RetSort list. */
        public list: msg.ISortInfo[];

        /**
         * Creates a new GW2C_RetSort instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_RetSort instance
         */
        public static create(properties?: msg.IGW2C_RetSort): msg.GW2C_RetSort;

        /**
         * Encodes the specified GW2C_RetSort message. Does not implicitly {@link msg.GW2C_RetSort.verify|verify} messages.
         * @param message GW2C_RetSort message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_RetSort, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_RetSort message, length delimited. Does not implicitly {@link msg.GW2C_RetSort.verify|verify} messages.
         * @param message GW2C_RetSort message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_RetSort, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_RetSort message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_RetSort
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_RetSort;

        /**
         * Decodes a GW2C_RetSort message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_RetSort
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_RetSort;

        /**
         * Verifies a GW2C_RetSort message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_RetSort message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_RetSort
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_RetSort;

        /**
         * Creates a plain object from a GW2C_RetSort message. Also converts values to other types if specified.
         * @param message GW2C_RetSort
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_RetSort, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_RetSort to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_ScoreReturn. */
    interface IGW2C_ScoreReturn {

        /** GW2C_ScoreReturn type */
        type?: (number|null);

        /** GW2C_ScoreReturn list */
        list?: (msg.ISortInfo[]|null);
    }

    /** Represents a GW2C_ScoreReturn. */
    class GW2C_ScoreReturn implements IGW2C_ScoreReturn {

        /**
         * Constructs a new GW2C_ScoreReturn.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_ScoreReturn);

        /** GW2C_ScoreReturn type. */
        public type: number;

        /** GW2C_ScoreReturn list. */
        public list: msg.ISortInfo[];

        /**
         * Creates a new GW2C_ScoreReturn instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_ScoreReturn instance
         */
        public static create(properties?: msg.IGW2C_ScoreReturn): msg.GW2C_ScoreReturn;

        /**
         * Encodes the specified GW2C_ScoreReturn message. Does not implicitly {@link msg.GW2C_ScoreReturn.verify|verify} messages.
         * @param message GW2C_ScoreReturn message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_ScoreReturn, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_ScoreReturn message, length delimited. Does not implicitly {@link msg.GW2C_ScoreReturn.verify|verify} messages.
         * @param message GW2C_ScoreReturn message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_ScoreReturn, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_ScoreReturn message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_ScoreReturn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_ScoreReturn;

        /**
         * Decodes a GW2C_ScoreReturn message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_ScoreReturn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_ScoreReturn;

        /**
         * Verifies a GW2C_ScoreReturn message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_ScoreReturn message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_ScoreReturn
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_ScoreReturn;

        /**
         * Creates a plain object from a GW2C_ScoreReturn message. Also converts values to other types if specified.
         * @param message GW2C_ScoreReturn
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_ScoreReturn, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_ScoreReturn to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MySort. */
    interface IMySort {

        /** MySort type */
        type?: (number|null);

        /** MySort score */
        score?: (number|null);

        /** MySort rank */
        rank?: (number|null);
    }

    /** Represents a MySort. */
    class MySort implements IMySort {

        /**
         * Constructs a new MySort.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IMySort);

        /** MySort type. */
        public type: number;

        /** MySort score. */
        public score: number;

        /** MySort rank. */
        public rank: number;

        /**
         * Creates a new MySort instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MySort instance
         */
        public static create(properties?: msg.IMySort): msg.MySort;

        /**
         * Encodes the specified MySort message. Does not implicitly {@link msg.MySort.verify|verify} messages.
         * @param message MySort message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IMySort, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified MySort message, length delimited. Does not implicitly {@link msg.MySort.verify|verify} messages.
         * @param message MySort message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IMySort, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a MySort message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MySort
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.MySort;

        /**
         * Decodes a MySort message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MySort
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.MySort;

        /**
         * Verifies a MySort message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MySort message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MySort
         */
        public static fromObject(object: { [k: string]: any }): msg.MySort;

        /**
         * Creates a plain object from a MySort message. Also converts values to other types if specified.
         * @param message MySort
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.MySort, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MySort to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_UserInfo. */
    interface IGW2C_UserInfo {

        /** GW2C_UserInfo id */
        id?: (number|null);

        /** GW2C_UserInfo slist */
        slist?: (msg.IMySort[]|null);
    }

    /** Represents a GW2C_UserInfo. */
    class GW2C_UserInfo implements IGW2C_UserInfo {

        /**
         * Constructs a new GW2C_UserInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_UserInfo);

        /** GW2C_UserInfo id. */
        public id: number;

        /** GW2C_UserInfo slist. */
        public slist: msg.IMySort[];

        /**
         * Creates a new GW2C_UserInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_UserInfo instance
         */
        public static create(properties?: msg.IGW2C_UserInfo): msg.GW2C_UserInfo;

        /**
         * Encodes the specified GW2C_UserInfo message. Does not implicitly {@link msg.GW2C_UserInfo.verify|verify} messages.
         * @param message GW2C_UserInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_UserInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_UserInfo message, length delimited. Does not implicitly {@link msg.GW2C_UserInfo.verify|verify} messages.
         * @param message GW2C_UserInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_UserInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_UserInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_UserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_UserInfo;

        /**
         * Decodes a GW2C_UserInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_UserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_UserInfo;

        /**
         * Verifies a GW2C_UserInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_UserInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_UserInfo
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_UserInfo;

        /**
         * Creates a plain object from a GW2C_UserInfo message. Also converts values to other types if specified.
         * @param message GW2C_UserInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_UserInfo, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_UserInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_ReqLogin. */
    interface IC2GW_ReqLogin {

        /** C2GW_ReqLogin account */
        account?: (string|null);

        /** C2GW_ReqLogin verifykey */
        verifykey?: (string|null);
    }

    /** Represents a C2GW_ReqLogin. */
    class C2GW_ReqLogin implements IC2GW_ReqLogin {

        /**
         * Constructs a new C2GW_ReqLogin.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_ReqLogin);

        /** C2GW_ReqLogin account. */
        public account: string;

        /** C2GW_ReqLogin verifykey. */
        public verifykey: string;

        /**
         * Creates a new C2GW_ReqLogin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_ReqLogin instance
         */
        public static create(properties?: msg.IC2GW_ReqLogin): msg.C2GW_ReqLogin;

        /**
         * Encodes the specified C2GW_ReqLogin message. Does not implicitly {@link msg.C2GW_ReqLogin.verify|verify} messages.
         * @param message C2GW_ReqLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_ReqLogin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_ReqLogin message, length delimited. Does not implicitly {@link msg.C2GW_ReqLogin.verify|verify} messages.
         * @param message C2GW_ReqLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_ReqLogin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_ReqLogin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_ReqLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_ReqLogin;

        /**
         * Decodes a C2GW_ReqLogin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_ReqLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_ReqLogin;

        /**
         * Verifies a C2GW_ReqLogin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_ReqLogin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_ReqLogin
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_ReqLogin;

        /**
         * Creates a plain object from a C2GW_ReqLogin message. Also converts values to other types if specified.
         * @param message C2GW_ReqLogin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_ReqLogin, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_ReqLogin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_RetLogin. */
    interface IGW2C_RetLogin {

        /** GW2C_RetLogin errcode */
        errcode?: (string|null);
    }

    /** Represents a GW2C_RetLogin. */
    class GW2C_RetLogin implements IGW2C_RetLogin {

        /**
         * Constructs a new GW2C_RetLogin.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_RetLogin);

        /** GW2C_RetLogin errcode. */
        public errcode: string;

        /**
         * Creates a new GW2C_RetLogin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_RetLogin instance
         */
        public static create(properties?: msg.IGW2C_RetLogin): msg.GW2C_RetLogin;

        /**
         * Encodes the specified GW2C_RetLogin message. Does not implicitly {@link msg.GW2C_RetLogin.verify|verify} messages.
         * @param message GW2C_RetLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_RetLogin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_RetLogin message, length delimited. Does not implicitly {@link msg.GW2C_RetLogin.verify|verify} messages.
         * @param message GW2C_RetLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_RetLogin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_RetLogin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_RetLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_RetLogin;

        /**
         * Decodes a GW2C_RetLogin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_RetLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_RetLogin;

        /**
         * Verifies a GW2C_RetLogin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_RetLogin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_RetLogin
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_RetLogin;

        /**
         * Creates a plain object from a GW2C_RetLogin message. Also converts values to other types if specified.
         * @param message GW2C_RetLogin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_RetLogin, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_RetLogin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_SendUserInfo. */
    interface IGW2C_SendUserInfo {

        /** GW2C_SendUserInfo entity */
        entity?: (msg.IEntityBase|null);

        /** GW2C_SendUserInfo base */
        base?: (msg.IUserBase|null);

        /** GW2C_SendUserInfo item */
        item?: (msg.IItemBin|null);
    }

    /** Represents a GW2C_SendUserInfo. */
    class GW2C_SendUserInfo implements IGW2C_SendUserInfo {

        /**
         * Constructs a new GW2C_SendUserInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_SendUserInfo);

        /** GW2C_SendUserInfo entity. */
        public entity?: (msg.IEntityBase|null);

        /** GW2C_SendUserInfo base. */
        public base?: (msg.IUserBase|null);

        /** GW2C_SendUserInfo item. */
        public item?: (msg.IItemBin|null);

        /**
         * Creates a new GW2C_SendUserInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_SendUserInfo instance
         */
        public static create(properties?: msg.IGW2C_SendUserInfo): msg.GW2C_SendUserInfo;

        /**
         * Encodes the specified GW2C_SendUserInfo message. Does not implicitly {@link msg.GW2C_SendUserInfo.verify|verify} messages.
         * @param message GW2C_SendUserInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_SendUserInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_SendUserInfo message, length delimited. Does not implicitly {@link msg.GW2C_SendUserInfo.verify|verify} messages.
         * @param message GW2C_SendUserInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_SendUserInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_SendUserInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_SendUserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_SendUserInfo;

        /**
         * Decodes a GW2C_SendUserInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_SendUserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_SendUserInfo;

        /**
         * Verifies a GW2C_SendUserInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_SendUserInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_SendUserInfo
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_SendUserInfo;

        /**
         * Creates a plain object from a GW2C_SendUserInfo message. Also converts values to other types if specified.
         * @param message GW2C_SendUserInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_SendUserInfo, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_SendUserInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_HeartBeat. */
    interface IC2GW_HeartBeat {

        /** C2GW_HeartBeat uid */
        uid?: (number|Long|null);

        /** C2GW_HeartBeat time */
        time?: (number|Long|null);

        /** C2GW_HeartBeat test */
        test?: (string[]|null);

        /** C2GW_HeartBeat token */
        token?: (string|null);
    }

    /** Represents a C2GW_HeartBeat. */
    class C2GW_HeartBeat implements IC2GW_HeartBeat {

        /**
         * Constructs a new C2GW_HeartBeat.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_HeartBeat);

        /** C2GW_HeartBeat uid. */
        public uid: (number|Long);

        /** C2GW_HeartBeat time. */
        public time: (number|Long);

        /** C2GW_HeartBeat test. */
        public test: string[];

        /** C2GW_HeartBeat token. */
        public token: string;

        /**
         * Creates a new C2GW_HeartBeat instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_HeartBeat instance
         */
        public static create(properties?: msg.IC2GW_HeartBeat): msg.C2GW_HeartBeat;

        /**
         * Encodes the specified C2GW_HeartBeat message. Does not implicitly {@link msg.C2GW_HeartBeat.verify|verify} messages.
         * @param message C2GW_HeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_HeartBeat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_HeartBeat message, length delimited. Does not implicitly {@link msg.C2GW_HeartBeat.verify|verify} messages.
         * @param message C2GW_HeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_HeartBeat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_HeartBeat message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_HeartBeat;

        /**
         * Decodes a C2GW_HeartBeat message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_HeartBeat;

        /**
         * Verifies a C2GW_HeartBeat message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_HeartBeat message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_HeartBeat
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_HeartBeat;

        /**
         * Creates a plain object from a C2GW_HeartBeat message. Also converts values to other types if specified.
         * @param message C2GW_HeartBeat
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_HeartBeat, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_HeartBeat to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_HeartBeat. */
    interface IGW2C_HeartBeat {

        /** GW2C_HeartBeat uid */
        uid?: (number|Long|null);

        /** GW2C_HeartBeat time */
        time?: (number|Long|null);

        /** GW2C_HeartBeat test */
        test?: (string[]|null);
    }

    /** Represents a GW2C_HeartBeat. */
    class GW2C_HeartBeat implements IGW2C_HeartBeat {

        /**
         * Constructs a new GW2C_HeartBeat.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_HeartBeat);

        /** GW2C_HeartBeat uid. */
        public uid: (number|Long);

        /** GW2C_HeartBeat time. */
        public time: (number|Long);

        /** GW2C_HeartBeat test. */
        public test: string[];

        /**
         * Creates a new GW2C_HeartBeat instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_HeartBeat instance
         */
        public static create(properties?: msg.IGW2C_HeartBeat): msg.GW2C_HeartBeat;

        /**
         * Encodes the specified GW2C_HeartBeat message. Does not implicitly {@link msg.GW2C_HeartBeat.verify|verify} messages.
         * @param message GW2C_HeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_HeartBeat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_HeartBeat message, length delimited. Does not implicitly {@link msg.GW2C_HeartBeat.verify|verify} messages.
         * @param message GW2C_HeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_HeartBeat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_HeartBeat message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_HeartBeat;

        /**
         * Decodes a GW2C_HeartBeat message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_HeartBeat;

        /**
         * Verifies a GW2C_HeartBeat message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_HeartBeat message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_HeartBeat
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_HeartBeat;

        /**
         * Creates a plain object from a GW2C_HeartBeat message. Also converts values to other types if specified.
         * @param message GW2C_HeartBeat
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_HeartBeat, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_HeartBeat to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_ReqStartGame. */
    interface IC2GW_ReqStartGame {

        /** C2GW_ReqStartGame gamekind */
        gamekind?: (number|null);

        /** C2GW_ReqStartGame gridnum */
        gridnum?: (number|null);
    }

    /** Represents a C2GW_ReqStartGame. */
    class C2GW_ReqStartGame implements IC2GW_ReqStartGame {

        /**
         * Constructs a new C2GW_ReqStartGame.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_ReqStartGame);

        /** C2GW_ReqStartGame gamekind. */
        public gamekind: number;

        /** C2GW_ReqStartGame gridnum. */
        public gridnum: number;

        /**
         * Creates a new C2GW_ReqStartGame instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_ReqStartGame instance
         */
        public static create(properties?: msg.IC2GW_ReqStartGame): msg.C2GW_ReqStartGame;

        /**
         * Encodes the specified C2GW_ReqStartGame message. Does not implicitly {@link msg.C2GW_ReqStartGame.verify|verify} messages.
         * @param message C2GW_ReqStartGame message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_ReqStartGame, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_ReqStartGame message, length delimited. Does not implicitly {@link msg.C2GW_ReqStartGame.verify|verify} messages.
         * @param message C2GW_ReqStartGame message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_ReqStartGame, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_ReqStartGame message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_ReqStartGame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_ReqStartGame;

        /**
         * Decodes a C2GW_ReqStartGame message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_ReqStartGame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_ReqStartGame;

        /**
         * Verifies a C2GW_ReqStartGame message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_ReqStartGame message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_ReqStartGame
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_ReqStartGame;

        /**
         * Creates a plain object from a C2GW_ReqStartGame message. Also converts values to other types if specified.
         * @param message C2GW_ReqStartGame
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_ReqStartGame, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_ReqStartGame to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_RetStartGame. */
    interface IGW2C_RetStartGame {

        /** GW2C_RetStartGame errcode */
        errcode?: (string|null);

        /** GW2C_RetStartGame roomid */
        roomid?: (number|Long|null);
    }

    /** Represents a GW2C_RetStartGame. */
    class GW2C_RetStartGame implements IGW2C_RetStartGame {

        /**
         * Constructs a new GW2C_RetStartGame.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_RetStartGame);

        /** GW2C_RetStartGame errcode. */
        public errcode: string;

        /** GW2C_RetStartGame roomid. */
        public roomid: (number|Long);

        /**
         * Creates a new GW2C_RetStartGame instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_RetStartGame instance
         */
        public static create(properties?: msg.IGW2C_RetStartGame): msg.GW2C_RetStartGame;

        /**
         * Encodes the specified GW2C_RetStartGame message. Does not implicitly {@link msg.GW2C_RetStartGame.verify|verify} messages.
         * @param message GW2C_RetStartGame message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_RetStartGame, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_RetStartGame message, length delimited. Does not implicitly {@link msg.GW2C_RetStartGame.verify|verify} messages.
         * @param message GW2C_RetStartGame message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_RetStartGame, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_RetStartGame message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_RetStartGame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_RetStartGame;

        /**
         * Decodes a GW2C_RetStartGame message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_RetStartGame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_RetStartGame;

        /**
         * Verifies a GW2C_RetStartGame message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_RetStartGame message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_RetStartGame
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_RetStartGame;

        /**
         * Creates a plain object from a GW2C_RetStartGame message. Also converts values to other types if specified.
         * @param message GW2C_RetStartGame
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_RetStartGame, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_RetStartGame to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_Ret7DayReward. */
    interface IGW2C_Ret7DayReward {

        /** GW2C_Ret7DayReward day */
        day?: (number|null);
    }

    /** Represents a GW2C_Ret7DayReward. */
    class GW2C_Ret7DayReward implements IGW2C_Ret7DayReward {

        /**
         * Constructs a new GW2C_Ret7DayReward.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_Ret7DayReward);

        /** GW2C_Ret7DayReward day. */
        public day: number;

        /**
         * Creates a new GW2C_Ret7DayReward instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_Ret7DayReward instance
         */
        public static create(properties?: msg.IGW2C_Ret7DayReward): msg.GW2C_Ret7DayReward;

        /**
         * Encodes the specified GW2C_Ret7DayReward message. Does not implicitly {@link msg.GW2C_Ret7DayReward.verify|verify} messages.
         * @param message GW2C_Ret7DayReward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_Ret7DayReward, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_Ret7DayReward message, length delimited. Does not implicitly {@link msg.GW2C_Ret7DayReward.verify|verify} messages.
         * @param message GW2C_Ret7DayReward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_Ret7DayReward, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_Ret7DayReward message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_Ret7DayReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_Ret7DayReward;

        /**
         * Decodes a GW2C_Ret7DayReward message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_Ret7DayReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_Ret7DayReward;

        /**
         * Verifies a GW2C_Ret7DayReward message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_Ret7DayReward message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_Ret7DayReward
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_Ret7DayReward;

        /**
         * Creates a plain object from a GW2C_Ret7DayReward message. Also converts values to other types if specified.
         * @param message GW2C_Ret7DayReward
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_Ret7DayReward, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_Ret7DayReward to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_Get7DayReward. */
    interface IC2GW_Get7DayReward {
    }

    /** Represents a C2GW_Get7DayReward. */
    class C2GW_Get7DayReward implements IC2GW_Get7DayReward {

        /**
         * Constructs a new C2GW_Get7DayReward.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_Get7DayReward);

        /**
         * Creates a new C2GW_Get7DayReward instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_Get7DayReward instance
         */
        public static create(properties?: msg.IC2GW_Get7DayReward): msg.C2GW_Get7DayReward;

        /**
         * Encodes the specified C2GW_Get7DayReward message. Does not implicitly {@link msg.C2GW_Get7DayReward.verify|verify} messages.
         * @param message C2GW_Get7DayReward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_Get7DayReward, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_Get7DayReward message, length delimited. Does not implicitly {@link msg.C2GW_Get7DayReward.verify|verify} messages.
         * @param message C2GW_Get7DayReward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_Get7DayReward, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_Get7DayReward message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_Get7DayReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_Get7DayReward;

        /**
         * Decodes a C2GW_Get7DayReward message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_Get7DayReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_Get7DayReward;

        /**
         * Verifies a C2GW_Get7DayReward message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_Get7DayReward message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_Get7DayReward
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_Get7DayReward;

        /**
         * Creates a plain object from a C2GW_Get7DayReward message. Also converts values to other types if specified.
         * @param message C2GW_Get7DayReward
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_Get7DayReward, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_Get7DayReward to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2L_ReqLogin. */
    interface IC2L_ReqLogin {

        /** C2L_ReqLogin account */
        account?: (string|null);

        /** C2L_ReqLogin nickname */
        nickname?: (string|null);

        /** C2L_ReqLogin face */
        face?: (string|null);

        /** C2L_ReqLogin token */
        token?: (string|null);
    }

    /** Represents a C2L_ReqLogin. */
    class C2L_ReqLogin implements IC2L_ReqLogin {

        /**
         * Constructs a new C2L_ReqLogin.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2L_ReqLogin);

        /** C2L_ReqLogin account. */
        public account: string;

        /** C2L_ReqLogin nickname. */
        public nickname: string;

        /** C2L_ReqLogin face. */
        public face: string;

        /** C2L_ReqLogin token. */
        public token: string;

        /**
         * Creates a new C2L_ReqLogin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2L_ReqLogin instance
         */
        public static create(properties?: msg.IC2L_ReqLogin): msg.C2L_ReqLogin;

        /**
         * Encodes the specified C2L_ReqLogin message. Does not implicitly {@link msg.C2L_ReqLogin.verify|verify} messages.
         * @param message C2L_ReqLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2L_ReqLogin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2L_ReqLogin message, length delimited. Does not implicitly {@link msg.C2L_ReqLogin.verify|verify} messages.
         * @param message C2L_ReqLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2L_ReqLogin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2L_ReqLogin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2L_ReqLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2L_ReqLogin;

        /**
         * Decodes a C2L_ReqLogin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2L_ReqLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2L_ReqLogin;

        /**
         * Verifies a C2L_ReqLogin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2L_ReqLogin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2L_ReqLogin
         */
        public static fromObject(object: { [k: string]: any }): msg.C2L_ReqLogin;

        /**
         * Creates a plain object from a C2L_ReqLogin message. Also converts values to other types if specified.
         * @param message C2L_ReqLogin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2L_ReqLogin, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2L_ReqLogin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a L2C_RetLogin. */
    interface IL2C_RetLogin {

        /** L2C_RetLogin result */
        result?: (number|null);

        /** L2C_RetLogin reason */
        reason?: (string|null);

        /** L2C_RetLogin gatehost */
        gatehost?: (msg.IIpHost|null);

        /** L2C_RetLogin verifykey */
        verifykey?: (string|null);
    }

    /** Represents a L2C_RetLogin. */
    class L2C_RetLogin implements IL2C_RetLogin {

        /**
         * Constructs a new L2C_RetLogin.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IL2C_RetLogin);

        /** L2C_RetLogin result. */
        public result: number;

        /** L2C_RetLogin reason. */
        public reason: string;

        /** L2C_RetLogin gatehost. */
        public gatehost?: (msg.IIpHost|null);

        /** L2C_RetLogin verifykey. */
        public verifykey: string;

        /**
         * Creates a new L2C_RetLogin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns L2C_RetLogin instance
         */
        public static create(properties?: msg.IL2C_RetLogin): msg.L2C_RetLogin;

        /**
         * Encodes the specified L2C_RetLogin message. Does not implicitly {@link msg.L2C_RetLogin.verify|verify} messages.
         * @param message L2C_RetLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IL2C_RetLogin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified L2C_RetLogin message, length delimited. Does not implicitly {@link msg.L2C_RetLogin.verify|verify} messages.
         * @param message L2C_RetLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IL2C_RetLogin, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a L2C_RetLogin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns L2C_RetLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.L2C_RetLogin;

        /**
         * Decodes a L2C_RetLogin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns L2C_RetLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.L2C_RetLogin;

        /**
         * Verifies a L2C_RetLogin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a L2C_RetLogin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns L2C_RetLogin
         */
        public static fromObject(object: { [k: string]: any }): msg.L2C_RetLogin;

        /**
         * Creates a plain object from a L2C_RetLogin message. Also converts values to other types if specified.
         * @param message L2C_RetLogin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.L2C_RetLogin, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this L2C_RetLogin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2L_ReqRegistAccount. */
    interface IC2L_ReqRegistAccount {

        /** C2L_ReqRegistAccount account */
        account?: (string|null);

        /** C2L_ReqRegistAccount passwd */
        passwd?: (string|null);

        /** C2L_ReqRegistAccount name */
        name?: (string|null);

        /** C2L_ReqRegistAccount face */
        face?: (string|null);
    }

    /** Represents a C2L_ReqRegistAccount. */
    class C2L_ReqRegistAccount implements IC2L_ReqRegistAccount {

        /**
         * Constructs a new C2L_ReqRegistAccount.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2L_ReqRegistAccount);

        /** C2L_ReqRegistAccount account. */
        public account: string;

        /** C2L_ReqRegistAccount passwd. */
        public passwd: string;

        /** C2L_ReqRegistAccount name. */
        public name: string;

        /** C2L_ReqRegistAccount face. */
        public face: string;

        /**
         * Creates a new C2L_ReqRegistAccount instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2L_ReqRegistAccount instance
         */
        public static create(properties?: msg.IC2L_ReqRegistAccount): msg.C2L_ReqRegistAccount;

        /**
         * Encodes the specified C2L_ReqRegistAccount message. Does not implicitly {@link msg.C2L_ReqRegistAccount.verify|verify} messages.
         * @param message C2L_ReqRegistAccount message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2L_ReqRegistAccount, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2L_ReqRegistAccount message, length delimited. Does not implicitly {@link msg.C2L_ReqRegistAccount.verify|verify} messages.
         * @param message C2L_ReqRegistAccount message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2L_ReqRegistAccount, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2L_ReqRegistAccount message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2L_ReqRegistAccount
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2L_ReqRegistAccount;

        /**
         * Decodes a C2L_ReqRegistAccount message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2L_ReqRegistAccount
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2L_ReqRegistAccount;

        /**
         * Verifies a C2L_ReqRegistAccount message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2L_ReqRegistAccount message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2L_ReqRegistAccount
         */
        public static fromObject(object: { [k: string]: any }): msg.C2L_ReqRegistAccount;

        /**
         * Creates a plain object from a C2L_ReqRegistAccount message. Also converts values to other types if specified.
         * @param message C2L_ReqRegistAccount
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2L_ReqRegistAccount, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2L_ReqRegistAccount to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a L2C_RetRegistAccount. */
    interface IL2C_RetRegistAccount {

        /** L2C_RetRegistAccount account */
        account?: (string|null);

        /** L2C_RetRegistAccount errcode */
        errcode?: (string|null);
    }

    /** Represents a L2C_RetRegistAccount. */
    class L2C_RetRegistAccount implements IL2C_RetRegistAccount {

        /**
         * Constructs a new L2C_RetRegistAccount.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IL2C_RetRegistAccount);

        /** L2C_RetRegistAccount account. */
        public account: string;

        /** L2C_RetRegistAccount errcode. */
        public errcode: string;

        /**
         * Creates a new L2C_RetRegistAccount instance using the specified properties.
         * @param [properties] Properties to set
         * @returns L2C_RetRegistAccount instance
         */
        public static create(properties?: msg.IL2C_RetRegistAccount): msg.L2C_RetRegistAccount;

        /**
         * Encodes the specified L2C_RetRegistAccount message. Does not implicitly {@link msg.L2C_RetRegistAccount.verify|verify} messages.
         * @param message L2C_RetRegistAccount message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IL2C_RetRegistAccount, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified L2C_RetRegistAccount message, length delimited. Does not implicitly {@link msg.L2C_RetRegistAccount.verify|verify} messages.
         * @param message L2C_RetRegistAccount message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IL2C_RetRegistAccount, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a L2C_RetRegistAccount message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns L2C_RetRegistAccount
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.L2C_RetRegistAccount;

        /**
         * Decodes a L2C_RetRegistAccount message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns L2C_RetRegistAccount
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.L2C_RetRegistAccount;

        /**
         * Verifies a L2C_RetRegistAccount message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a L2C_RetRegistAccount message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns L2C_RetRegistAccount
         */
        public static fromObject(object: { [k: string]: any }): msg.L2C_RetRegistAccount;

        /**
         * Creates a plain object from a L2C_RetRegistAccount message. Also converts values to other types if specified.
         * @param message L2C_RetRegistAccount
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.L2C_RetRegistAccount, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this L2C_RetRegistAccount to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IpHost. */
    interface IIpHost {

        /** IpHost ip */
        ip?: (string|null);

        /** IpHost port */
        port?: (number|null);
    }

    /** Represents an IpHost. */
    class IpHost implements IIpHost {

        /**
         * Constructs a new IpHost.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IIpHost);

        /** IpHost ip. */
        public ip: string;

        /** IpHost port. */
        public port: number;

        /**
         * Creates a new IpHost instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IpHost instance
         */
        public static create(properties?: msg.IIpHost): msg.IpHost;

        /**
         * Encodes the specified IpHost message. Does not implicitly {@link msg.IpHost.verify|verify} messages.
         * @param message IpHost message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IIpHost, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified IpHost message, length delimited. Does not implicitly {@link msg.IpHost.verify|verify} messages.
         * @param message IpHost message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IIpHost, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes an IpHost message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IpHost
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.IpHost;

        /**
         * Decodes an IpHost message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IpHost
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.IpHost;

        /**
         * Verifies an IpHost message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IpHost message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IpHost
         */
        public static fromObject(object: { [k: string]: any }): msg.IpHost;

        /**
         * Creates a plain object from an IpHost message. Also converts values to other types if specified.
         * @param message IpHost
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.IpHost, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IpHost to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** ItemId enum. */
    enum ItemId {
        YuanBao = 6001,
        Coupon = 6002,
        Gold = 6003,
        FreeStep = 6005
    }

    /** ItemType enum. */
    enum ItemType {
        Digital = 1,
        ShoppingCard = 2,
        DailyUse = 3,
        Toy = 4,
        MobileCard = 5,
        Currency = 6,
        CarAccessory = 7,
        Advertisement = 8,
        Smallware = 9
    }

    /** Properties of a PairNumItem. */
    interface IPairNumItem {

        /** PairNumItem itemid */
        itemid?: (number|null);

        /** PairNumItem num */
        num?: (number|null);
    }

    /** Represents a PairNumItem. */
    class PairNumItem implements IPairNumItem {

        /**
         * Constructs a new PairNumItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IPairNumItem);

        /** PairNumItem itemid. */
        public itemid: number;

        /** PairNumItem num. */
        public num: number;

        /**
         * Creates a new PairNumItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PairNumItem instance
         */
        public static create(properties?: msg.IPairNumItem): msg.PairNumItem;

        /**
         * Encodes the specified PairNumItem message. Does not implicitly {@link msg.PairNumItem.verify|verify} messages.
         * @param message PairNumItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IPairNumItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified PairNumItem message, length delimited. Does not implicitly {@link msg.PairNumItem.verify|verify} messages.
         * @param message PairNumItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IPairNumItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a PairNumItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PairNumItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.PairNumItem;

        /**
         * Decodes a PairNumItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PairNumItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.PairNumItem;

        /**
         * Verifies a PairNumItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PairNumItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PairNumItem
         */
        public static fromObject(object: { [k: string]: any }): msg.PairNumItem;

        /**
         * Creates a plain object from a PairNumItem message. Also converts values to other types if specified.
         * @param message PairNumItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.PairNumItem, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PairNumItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2L_ReqRegist. */
    interface IGW2L_ReqRegist {

        /** GW2L_ReqRegist account */
        account?: (string|null);

        /** GW2L_ReqRegist passwd */
        passwd?: (string|null);

        /** GW2L_ReqRegist host */
        host?: (msg.IIpHost|null);
    }

    /** Represents a GW2L_ReqRegist. */
    class GW2L_ReqRegist implements IGW2L_ReqRegist {

        /**
         * Constructs a new GW2L_ReqRegist.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2L_ReqRegist);

        /** GW2L_ReqRegist account. */
        public account: string;

        /** GW2L_ReqRegist passwd. */
        public passwd: string;

        /** GW2L_ReqRegist host. */
        public host?: (msg.IIpHost|null);

        /**
         * Creates a new GW2L_ReqRegist instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2L_ReqRegist instance
         */
        public static create(properties?: msg.IGW2L_ReqRegist): msg.GW2L_ReqRegist;

        /**
         * Encodes the specified GW2L_ReqRegist message. Does not implicitly {@link msg.GW2L_ReqRegist.verify|verify} messages.
         * @param message GW2L_ReqRegist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2L_ReqRegist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2L_ReqRegist message, length delimited. Does not implicitly {@link msg.GW2L_ReqRegist.verify|verify} messages.
         * @param message GW2L_ReqRegist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2L_ReqRegist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2L_ReqRegist message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2L_ReqRegist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2L_ReqRegist;

        /**
         * Decodes a GW2L_ReqRegist message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2L_ReqRegist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2L_ReqRegist;

        /**
         * Verifies a GW2L_ReqRegist message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2L_ReqRegist message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2L_ReqRegist
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2L_ReqRegist;

        /**
         * Creates a plain object from a GW2L_ReqRegist message. Also converts values to other types if specified.
         * @param message GW2L_ReqRegist
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2L_ReqRegist, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2L_ReqRegist to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a L2GW_RetRegist. */
    interface IL2GW_RetRegist {

        /** L2GW_RetRegist errocde */
        errocde?: (string|null);

        /** L2GW_RetRegist host */
        host?: (msg.IIpHost|null);
    }

    /** Represents a L2GW_RetRegist. */
    class L2GW_RetRegist implements IL2GW_RetRegist {

        /**
         * Constructs a new L2GW_RetRegist.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IL2GW_RetRegist);

        /** L2GW_RetRegist errocde. */
        public errocde: string;

        /** L2GW_RetRegist host. */
        public host?: (msg.IIpHost|null);

        /**
         * Creates a new L2GW_RetRegist instance using the specified properties.
         * @param [properties] Properties to set
         * @returns L2GW_RetRegist instance
         */
        public static create(properties?: msg.IL2GW_RetRegist): msg.L2GW_RetRegist;

        /**
         * Encodes the specified L2GW_RetRegist message. Does not implicitly {@link msg.L2GW_RetRegist.verify|verify} messages.
         * @param message L2GW_RetRegist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IL2GW_RetRegist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified L2GW_RetRegist message, length delimited. Does not implicitly {@link msg.L2GW_RetRegist.verify|verify} messages.
         * @param message L2GW_RetRegist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IL2GW_RetRegist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a L2GW_RetRegist message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns L2GW_RetRegist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.L2GW_RetRegist;

        /**
         * Decodes a L2GW_RetRegist message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns L2GW_RetRegist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.L2GW_RetRegist;

        /**
         * Verifies a L2GW_RetRegist message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a L2GW_RetRegist message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns L2GW_RetRegist
         */
        public static fromObject(object: { [k: string]: any }): msg.L2GW_RetRegist;

        /**
         * Creates a plain object from a L2GW_RetRegist message. Also converts values to other types if specified.
         * @param message L2GW_RetRegist
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.L2GW_RetRegist, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this L2GW_RetRegist to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2L_HeartBeat. */
    interface IGW2L_HeartBeat {
    }

    /** Represents a GW2L_HeartBeat. */
    class GW2L_HeartBeat implements IGW2L_HeartBeat {

        /**
         * Constructs a new GW2L_HeartBeat.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2L_HeartBeat);

        /**
         * Creates a new GW2L_HeartBeat instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2L_HeartBeat instance
         */
        public static create(properties?: msg.IGW2L_HeartBeat): msg.GW2L_HeartBeat;

        /**
         * Encodes the specified GW2L_HeartBeat message. Does not implicitly {@link msg.GW2L_HeartBeat.verify|verify} messages.
         * @param message GW2L_HeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2L_HeartBeat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2L_HeartBeat message, length delimited. Does not implicitly {@link msg.GW2L_HeartBeat.verify|verify} messages.
         * @param message GW2L_HeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2L_HeartBeat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2L_HeartBeat message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2L_HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2L_HeartBeat;

        /**
         * Decodes a GW2L_HeartBeat message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2L_HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2L_HeartBeat;

        /**
         * Verifies a GW2L_HeartBeat message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2L_HeartBeat message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2L_HeartBeat
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2L_HeartBeat;

        /**
         * Creates a plain object from a GW2L_HeartBeat message. Also converts values to other types if specified.
         * @param message GW2L_HeartBeat
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2L_HeartBeat, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2L_HeartBeat to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a L2GW_HeartBeat. */
    interface IL2GW_HeartBeat {
    }

    /** Represents a L2GW_HeartBeat. */
    class L2GW_HeartBeat implements IL2GW_HeartBeat {

        /**
         * Constructs a new L2GW_HeartBeat.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IL2GW_HeartBeat);

        /**
         * Creates a new L2GW_HeartBeat instance using the specified properties.
         * @param [properties] Properties to set
         * @returns L2GW_HeartBeat instance
         */
        public static create(properties?: msg.IL2GW_HeartBeat): msg.L2GW_HeartBeat;

        /**
         * Encodes the specified L2GW_HeartBeat message. Does not implicitly {@link msg.L2GW_HeartBeat.verify|verify} messages.
         * @param message L2GW_HeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IL2GW_HeartBeat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified L2GW_HeartBeat message, length delimited. Does not implicitly {@link msg.L2GW_HeartBeat.verify|verify} messages.
         * @param message L2GW_HeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IL2GW_HeartBeat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a L2GW_HeartBeat message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns L2GW_HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.L2GW_HeartBeat;

        /**
         * Decodes a L2GW_HeartBeat message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns L2GW_HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.L2GW_HeartBeat;

        /**
         * Verifies a L2GW_HeartBeat message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a L2GW_HeartBeat message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns L2GW_HeartBeat
         */
        public static fromObject(object: { [k: string]: any }): msg.L2GW_HeartBeat;

        /**
         * Creates a plain object from a L2GW_HeartBeat message. Also converts values to other types if specified.
         * @param message L2GW_HeartBeat
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.L2GW_HeartBeat, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this L2GW_HeartBeat to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a L2GW_ReqRegistUser. */
    interface IL2GW_ReqRegistUser {

        /** L2GW_ReqRegistUser account */
        account?: (string|null);

        /** L2GW_ReqRegistUser expire */
        expire?: (number|Long|null);

        /** L2GW_ReqRegistUser gatehost */
        gatehost?: (string|null);

        /** L2GW_ReqRegistUser sid */
        sid?: (number|null);

        /** L2GW_ReqRegistUser timestamp */
        timestamp?: (number|Long|null);

        /** L2GW_ReqRegistUser verifykey */
        verifykey?: (string|null);
    }

    /** Represents a L2GW_ReqRegistUser. */
    class L2GW_ReqRegistUser implements IL2GW_ReqRegistUser {

        /**
         * Constructs a new L2GW_ReqRegistUser.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IL2GW_ReqRegistUser);

        /** L2GW_ReqRegistUser account. */
        public account: string;

        /** L2GW_ReqRegistUser expire. */
        public expire: (number|Long);

        /** L2GW_ReqRegistUser gatehost. */
        public gatehost: string;

        /** L2GW_ReqRegistUser sid. */
        public sid: number;

        /** L2GW_ReqRegistUser timestamp. */
        public timestamp: (number|Long);

        /** L2GW_ReqRegistUser verifykey. */
        public verifykey: string;

        /**
         * Creates a new L2GW_ReqRegistUser instance using the specified properties.
         * @param [properties] Properties to set
         * @returns L2GW_ReqRegistUser instance
         */
        public static create(properties?: msg.IL2GW_ReqRegistUser): msg.L2GW_ReqRegistUser;

        /**
         * Encodes the specified L2GW_ReqRegistUser message. Does not implicitly {@link msg.L2GW_ReqRegistUser.verify|verify} messages.
         * @param message L2GW_ReqRegistUser message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IL2GW_ReqRegistUser, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified L2GW_ReqRegistUser message, length delimited. Does not implicitly {@link msg.L2GW_ReqRegistUser.verify|verify} messages.
         * @param message L2GW_ReqRegistUser message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IL2GW_ReqRegistUser, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a L2GW_ReqRegistUser message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns L2GW_ReqRegistUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.L2GW_ReqRegistUser;

        /**
         * Decodes a L2GW_ReqRegistUser message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns L2GW_ReqRegistUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.L2GW_ReqRegistUser;

        /**
         * Verifies a L2GW_ReqRegistUser message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a L2GW_ReqRegistUser message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns L2GW_ReqRegistUser
         */
        public static fromObject(object: { [k: string]: any }): msg.L2GW_ReqRegistUser;

        /**
         * Creates a plain object from a L2GW_ReqRegistUser message. Also converts values to other types if specified.
         * @param message L2GW_ReqRegistUser
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.L2GW_ReqRegistUser, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this L2GW_ReqRegistUser to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2L_RegistUserRet. */
    interface IGW2L_RegistUserRet {

        /** GW2L_RegistUserRet account */
        account?: (string|null);

        /** GW2L_RegistUserRet gatehost */
        gatehost?: (string|null);

        /** GW2L_RegistUserRet errcode */
        errcode?: (string|null);

        /** GW2L_RegistUserRet sid */
        sid?: (number|null);

        /** GW2L_RegistUserRet verifykey */
        verifykey?: (string|null);
    }

    /** Represents a GW2L_RegistUserRet. */
    class GW2L_RegistUserRet implements IGW2L_RegistUserRet {

        /**
         * Constructs a new GW2L_RegistUserRet.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2L_RegistUserRet);

        /** GW2L_RegistUserRet account. */
        public account: string;

        /** GW2L_RegistUserRet gatehost. */
        public gatehost: string;

        /** GW2L_RegistUserRet errcode. */
        public errcode: string;

        /** GW2L_RegistUserRet sid. */
        public sid: number;

        /** GW2L_RegistUserRet verifykey. */
        public verifykey: string;

        /**
         * Creates a new GW2L_RegistUserRet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2L_RegistUserRet instance
         */
        public static create(properties?: msg.IGW2L_RegistUserRet): msg.GW2L_RegistUserRet;

        /**
         * Encodes the specified GW2L_RegistUserRet message. Does not implicitly {@link msg.GW2L_RegistUserRet.verify|verify} messages.
         * @param message GW2L_RegistUserRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2L_RegistUserRet, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2L_RegistUserRet message, length delimited. Does not implicitly {@link msg.GW2L_RegistUserRet.verify|verify} messages.
         * @param message GW2L_RegistUserRet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2L_RegistUserRet, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2L_RegistUserRet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2L_RegistUserRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2L_RegistUserRet;

        /**
         * Decodes a GW2L_RegistUserRet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2L_RegistUserRet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2L_RegistUserRet;

        /**
         * Verifies a GW2L_RegistUserRet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2L_RegistUserRet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2L_RegistUserRet
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2L_RegistUserRet;

        /**
         * Creates a plain object from a GW2L_RegistUserRet message. Also converts values to other types if specified.
         * @param message GW2L_RegistUserRet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2L_RegistUserRet, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2L_RegistUserRet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2MS_ReqRegist. */
    interface IGW2MS_ReqRegist {

        /** GW2MS_ReqRegist account */
        account?: (string|null);

        /** GW2MS_ReqRegist passwd */
        passwd?: (string|null);

        /** GW2MS_ReqRegist agentname */
        agentname?: (string|null);

        /** GW2MS_ReqRegist host */
        host?: (msg.IIpHost|null);
    }

    /** Represents a GW2MS_ReqRegist. */
    class GW2MS_ReqRegist implements IGW2MS_ReqRegist {

        /**
         * Constructs a new GW2MS_ReqRegist.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2MS_ReqRegist);

        /** GW2MS_ReqRegist account. */
        public account: string;

        /** GW2MS_ReqRegist passwd. */
        public passwd: string;

        /** GW2MS_ReqRegist agentname. */
        public agentname: string;

        /** GW2MS_ReqRegist host. */
        public host?: (msg.IIpHost|null);

        /**
         * Creates a new GW2MS_ReqRegist instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2MS_ReqRegist instance
         */
        public static create(properties?: msg.IGW2MS_ReqRegist): msg.GW2MS_ReqRegist;

        /**
         * Encodes the specified GW2MS_ReqRegist message. Does not implicitly {@link msg.GW2MS_ReqRegist.verify|verify} messages.
         * @param message GW2MS_ReqRegist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2MS_ReqRegist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2MS_ReqRegist message, length delimited. Does not implicitly {@link msg.GW2MS_ReqRegist.verify|verify} messages.
         * @param message GW2MS_ReqRegist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2MS_ReqRegist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2MS_ReqRegist message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2MS_ReqRegist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2MS_ReqRegist;

        /**
         * Decodes a GW2MS_ReqRegist message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2MS_ReqRegist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2MS_ReqRegist;

        /**
         * Verifies a GW2MS_ReqRegist message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2MS_ReqRegist message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2MS_ReqRegist
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2MS_ReqRegist;

        /**
         * Creates a plain object from a GW2MS_ReqRegist message. Also converts values to other types if specified.
         * @param message GW2MS_ReqRegist
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2MS_ReqRegist, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2MS_ReqRegist to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MS2GW_RetRegist. */
    interface IMS2GW_RetRegist {

        /** MS2GW_RetRegist errcode */
        errcode?: (string|null);

        /** MS2GW_RetRegist host */
        host?: (msg.IIpHost|null);
    }

    /** Represents a MS2GW_RetRegist. */
    class MS2GW_RetRegist implements IMS2GW_RetRegist {

        /**
         * Constructs a new MS2GW_RetRegist.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IMS2GW_RetRegist);

        /** MS2GW_RetRegist errcode. */
        public errcode: string;

        /** MS2GW_RetRegist host. */
        public host?: (msg.IIpHost|null);

        /**
         * Creates a new MS2GW_RetRegist instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MS2GW_RetRegist instance
         */
        public static create(properties?: msg.IMS2GW_RetRegist): msg.MS2GW_RetRegist;

        /**
         * Encodes the specified MS2GW_RetRegist message. Does not implicitly {@link msg.MS2GW_RetRegist.verify|verify} messages.
         * @param message MS2GW_RetRegist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IMS2GW_RetRegist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified MS2GW_RetRegist message, length delimited. Does not implicitly {@link msg.MS2GW_RetRegist.verify|verify} messages.
         * @param message MS2GW_RetRegist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IMS2GW_RetRegist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a MS2GW_RetRegist message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MS2GW_RetRegist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.MS2GW_RetRegist;

        /**
         * Decodes a MS2GW_RetRegist message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MS2GW_RetRegist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.MS2GW_RetRegist;

        /**
         * Verifies a MS2GW_RetRegist message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MS2GW_RetRegist message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MS2GW_RetRegist
         */
        public static fromObject(object: { [k: string]: any }): msg.MS2GW_RetRegist;

        /**
         * Creates a plain object from a MS2GW_RetRegist message. Also converts values to other types if specified.
         * @param message MS2GW_RetRegist
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.MS2GW_RetRegist, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MS2GW_RetRegist to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2MS_HeartBeat. */
    interface IGW2MS_HeartBeat {
    }

    /** Represents a GW2MS_HeartBeat. */
    class GW2MS_HeartBeat implements IGW2MS_HeartBeat {

        /**
         * Constructs a new GW2MS_HeartBeat.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2MS_HeartBeat);

        /**
         * Creates a new GW2MS_HeartBeat instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2MS_HeartBeat instance
         */
        public static create(properties?: msg.IGW2MS_HeartBeat): msg.GW2MS_HeartBeat;

        /**
         * Encodes the specified GW2MS_HeartBeat message. Does not implicitly {@link msg.GW2MS_HeartBeat.verify|verify} messages.
         * @param message GW2MS_HeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2MS_HeartBeat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2MS_HeartBeat message, length delimited. Does not implicitly {@link msg.GW2MS_HeartBeat.verify|verify} messages.
         * @param message GW2MS_HeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2MS_HeartBeat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2MS_HeartBeat message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2MS_HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2MS_HeartBeat;

        /**
         * Decodes a GW2MS_HeartBeat message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2MS_HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2MS_HeartBeat;

        /**
         * Verifies a GW2MS_HeartBeat message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2MS_HeartBeat message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2MS_HeartBeat
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2MS_HeartBeat;

        /**
         * Creates a plain object from a GW2MS_HeartBeat message. Also converts values to other types if specified.
         * @param message GW2MS_HeartBeat
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2MS_HeartBeat, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2MS_HeartBeat to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MS2GW_HeartBeat. */
    interface IMS2GW_HeartBeat {
    }

    /** Represents a MS2GW_HeartBeat. */
    class MS2GW_HeartBeat implements IMS2GW_HeartBeat {

        /**
         * Constructs a new MS2GW_HeartBeat.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IMS2GW_HeartBeat);

        /**
         * Creates a new MS2GW_HeartBeat instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MS2GW_HeartBeat instance
         */
        public static create(properties?: msg.IMS2GW_HeartBeat): msg.MS2GW_HeartBeat;

        /**
         * Encodes the specified MS2GW_HeartBeat message. Does not implicitly {@link msg.MS2GW_HeartBeat.verify|verify} messages.
         * @param message MS2GW_HeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IMS2GW_HeartBeat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified MS2GW_HeartBeat message, length delimited. Does not implicitly {@link msg.MS2GW_HeartBeat.verify|verify} messages.
         * @param message MS2GW_HeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IMS2GW_HeartBeat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a MS2GW_HeartBeat message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MS2GW_HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.MS2GW_HeartBeat;

        /**
         * Decodes a MS2GW_HeartBeat message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MS2GW_HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.MS2GW_HeartBeat;

        /**
         * Verifies a MS2GW_HeartBeat message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MS2GW_HeartBeat message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MS2GW_HeartBeat
         */
        public static fromObject(object: { [k: string]: any }): msg.MS2GW_HeartBeat;

        /**
         * Creates a plain object from a MS2GW_HeartBeat message. Also converts values to other types if specified.
         * @param message MS2GW_HeartBeat
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.MS2GW_HeartBeat, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MS2GW_HeartBeat to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2MS_ReqCreateRoom. */
    interface IGW2MS_ReqCreateRoom {

        /** GW2MS_ReqCreateRoom userid */
        userid?: (number|Long|null);

        /** GW2MS_ReqCreateRoom gamekind */
        gamekind?: (number|null);

        /** GW2MS_ReqCreateRoom gridnum */
        gridnum?: (number|null);
    }

    /** Represents a GW2MS_ReqCreateRoom. */
    class GW2MS_ReqCreateRoom implements IGW2MS_ReqCreateRoom {

        /**
         * Constructs a new GW2MS_ReqCreateRoom.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2MS_ReqCreateRoom);

        /** GW2MS_ReqCreateRoom userid. */
        public userid: (number|Long);

        /** GW2MS_ReqCreateRoom gamekind. */
        public gamekind: number;

        /** GW2MS_ReqCreateRoom gridnum. */
        public gridnum: number;

        /**
         * Creates a new GW2MS_ReqCreateRoom instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2MS_ReqCreateRoom instance
         */
        public static create(properties?: msg.IGW2MS_ReqCreateRoom): msg.GW2MS_ReqCreateRoom;

        /**
         * Encodes the specified GW2MS_ReqCreateRoom message. Does not implicitly {@link msg.GW2MS_ReqCreateRoom.verify|verify} messages.
         * @param message GW2MS_ReqCreateRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2MS_ReqCreateRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2MS_ReqCreateRoom message, length delimited. Does not implicitly {@link msg.GW2MS_ReqCreateRoom.verify|verify} messages.
         * @param message GW2MS_ReqCreateRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2MS_ReqCreateRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2MS_ReqCreateRoom message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2MS_ReqCreateRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2MS_ReqCreateRoom;

        /**
         * Decodes a GW2MS_ReqCreateRoom message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2MS_ReqCreateRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2MS_ReqCreateRoom;

        /**
         * Verifies a GW2MS_ReqCreateRoom message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2MS_ReqCreateRoom message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2MS_ReqCreateRoom
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2MS_ReqCreateRoom;

        /**
         * Creates a plain object from a GW2MS_ReqCreateRoom message. Also converts values to other types if specified.
         * @param message GW2MS_ReqCreateRoom
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2MS_ReqCreateRoom, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2MS_ReqCreateRoom to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MS2GW_RetCreateRoom. */
    interface IMS2GW_RetCreateRoom {

        /** MS2GW_RetCreateRoom userid */
        userid?: (number|Long|null);

        /** MS2GW_RetCreateRoom roomid */
        roomid?: (number|Long|null);

        /** MS2GW_RetCreateRoom errcode */
        errcode?: (string|null);

        /** MS2GW_RetCreateRoom roomagent */
        roomagent?: (string|null);
    }

    /** Represents a MS2GW_RetCreateRoom. */
    class MS2GW_RetCreateRoom implements IMS2GW_RetCreateRoom {

        /**
         * Constructs a new MS2GW_RetCreateRoom.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IMS2GW_RetCreateRoom);

        /** MS2GW_RetCreateRoom userid. */
        public userid: (number|Long);

        /** MS2GW_RetCreateRoom roomid. */
        public roomid: (number|Long);

        /** MS2GW_RetCreateRoom errcode. */
        public errcode: string;

        /** MS2GW_RetCreateRoom roomagent. */
        public roomagent: string;

        /**
         * Creates a new MS2GW_RetCreateRoom instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MS2GW_RetCreateRoom instance
         */
        public static create(properties?: msg.IMS2GW_RetCreateRoom): msg.MS2GW_RetCreateRoom;

        /**
         * Encodes the specified MS2GW_RetCreateRoom message. Does not implicitly {@link msg.MS2GW_RetCreateRoom.verify|verify} messages.
         * @param message MS2GW_RetCreateRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IMS2GW_RetCreateRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified MS2GW_RetCreateRoom message, length delimited. Does not implicitly {@link msg.MS2GW_RetCreateRoom.verify|verify} messages.
         * @param message MS2GW_RetCreateRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IMS2GW_RetCreateRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a MS2GW_RetCreateRoom message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MS2GW_RetCreateRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.MS2GW_RetCreateRoom;

        /**
         * Decodes a MS2GW_RetCreateRoom message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MS2GW_RetCreateRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.MS2GW_RetCreateRoom;

        /**
         * Verifies a MS2GW_RetCreateRoom message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MS2GW_RetCreateRoom message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MS2GW_RetCreateRoom
         */
        public static fromObject(object: { [k: string]: any }): msg.MS2GW_RetCreateRoom;

        /**
         * Creates a plain object from a MS2GW_RetCreateRoom message. Also converts values to other types if specified.
         * @param message MS2GW_RetCreateRoom
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.MS2GW_RetCreateRoom, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MS2GW_RetCreateRoom to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RS2GW_ReqRegist. */
    interface IRS2GW_ReqRegist {

        /** RS2GW_ReqRegist account */
        account?: (string|null);

        /** RS2GW_ReqRegist passwd */
        passwd?: (string|null);

        /** RS2GW_ReqRegist agentname */
        agentname?: (string|null);
    }

    /** Represents a RS2GW_ReqRegist. */
    class RS2GW_ReqRegist implements IRS2GW_ReqRegist {

        /**
         * Constructs a new RS2GW_ReqRegist.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRS2GW_ReqRegist);

        /** RS2GW_ReqRegist account. */
        public account: string;

        /** RS2GW_ReqRegist passwd. */
        public passwd: string;

        /** RS2GW_ReqRegist agentname. */
        public agentname: string;

        /**
         * Creates a new RS2GW_ReqRegist instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RS2GW_ReqRegist instance
         */
        public static create(properties?: msg.IRS2GW_ReqRegist): msg.RS2GW_ReqRegist;

        /**
         * Encodes the specified RS2GW_ReqRegist message. Does not implicitly {@link msg.RS2GW_ReqRegist.verify|verify} messages.
         * @param message RS2GW_ReqRegist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRS2GW_ReqRegist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified RS2GW_ReqRegist message, length delimited. Does not implicitly {@link msg.RS2GW_ReqRegist.verify|verify} messages.
         * @param message RS2GW_ReqRegist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRS2GW_ReqRegist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a RS2GW_ReqRegist message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RS2GW_ReqRegist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.RS2GW_ReqRegist;

        /**
         * Decodes a RS2GW_ReqRegist message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RS2GW_ReqRegist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.RS2GW_ReqRegist;

        /**
         * Verifies a RS2GW_ReqRegist message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RS2GW_ReqRegist message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RS2GW_ReqRegist
         */
        public static fromObject(object: { [k: string]: any }): msg.RS2GW_ReqRegist;

        /**
         * Creates a plain object from a RS2GW_ReqRegist message. Also converts values to other types if specified.
         * @param message RS2GW_ReqRegist
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RS2GW_ReqRegist, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RS2GW_ReqRegist to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2RS_RetRegist. */
    interface IGW2RS_RetRegist {

        /** GW2RS_RetRegist errcode */
        errcode?: (string|null);

        /** GW2RS_RetRegist agentname */
        agentname?: (string|null);
    }

    /** Represents a GW2RS_RetRegist. */
    class GW2RS_RetRegist implements IGW2RS_RetRegist {

        /**
         * Constructs a new GW2RS_RetRegist.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2RS_RetRegist);

        /** GW2RS_RetRegist errcode. */
        public errcode: string;

        /** GW2RS_RetRegist agentname. */
        public agentname: string;

        /**
         * Creates a new GW2RS_RetRegist instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2RS_RetRegist instance
         */
        public static create(properties?: msg.IGW2RS_RetRegist): msg.GW2RS_RetRegist;

        /**
         * Encodes the specified GW2RS_RetRegist message. Does not implicitly {@link msg.GW2RS_RetRegist.verify|verify} messages.
         * @param message GW2RS_RetRegist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2RS_RetRegist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2RS_RetRegist message, length delimited. Does not implicitly {@link msg.GW2RS_RetRegist.verify|verify} messages.
         * @param message GW2RS_RetRegist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2RS_RetRegist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2RS_RetRegist message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2RS_RetRegist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2RS_RetRegist;

        /**
         * Decodes a GW2RS_RetRegist message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2RS_RetRegist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2RS_RetRegist;

        /**
         * Verifies a GW2RS_RetRegist message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2RS_RetRegist message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2RS_RetRegist
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2RS_RetRegist;

        /**
         * Creates a plain object from a GW2RS_RetRegist message. Also converts values to other types if specified.
         * @param message GW2RS_RetRegist
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2RS_RetRegist, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2RS_RetRegist to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2RS_UserDisconnect. */
    interface IGW2RS_UserDisconnect {

        /** GW2RS_UserDisconnect roomid */
        roomid?: (number|Long|null);

        /** GW2RS_UserDisconnect userid */
        userid?: (number|Long|null);
    }

    /** Represents a GW2RS_UserDisconnect. */
    class GW2RS_UserDisconnect implements IGW2RS_UserDisconnect {

        /**
         * Constructs a new GW2RS_UserDisconnect.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2RS_UserDisconnect);

        /** GW2RS_UserDisconnect roomid. */
        public roomid: (number|Long);

        /** GW2RS_UserDisconnect userid. */
        public userid: (number|Long);

        /**
         * Creates a new GW2RS_UserDisconnect instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2RS_UserDisconnect instance
         */
        public static create(properties?: msg.IGW2RS_UserDisconnect): msg.GW2RS_UserDisconnect;

        /**
         * Encodes the specified GW2RS_UserDisconnect message. Does not implicitly {@link msg.GW2RS_UserDisconnect.verify|verify} messages.
         * @param message GW2RS_UserDisconnect message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2RS_UserDisconnect, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2RS_UserDisconnect message, length delimited. Does not implicitly {@link msg.GW2RS_UserDisconnect.verify|verify} messages.
         * @param message GW2RS_UserDisconnect message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2RS_UserDisconnect, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2RS_UserDisconnect message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2RS_UserDisconnect
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2RS_UserDisconnect;

        /**
         * Decodes a GW2RS_UserDisconnect message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2RS_UserDisconnect
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2RS_UserDisconnect;

        /**
         * Verifies a GW2RS_UserDisconnect message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2RS_UserDisconnect message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2RS_UserDisconnect
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2RS_UserDisconnect;

        /**
         * Creates a plain object from a GW2RS_UserDisconnect message. Also converts values to other types if specified.
         * @param message GW2RS_UserDisconnect
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2RS_UserDisconnect, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2RS_UserDisconnect to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RS2GW_RetUserDisconnect. */
    interface IRS2GW_RetUserDisconnect {

        /** RS2GW_RetUserDisconnect roomid */
        roomid?: (number|Long|null);

        /** RS2GW_RetUserDisconnect userid */
        userid?: (number|Long|null);

        /** RS2GW_RetUserDisconnect errcode */
        errcode?: (string|null);
    }

    /** Represents a RS2GW_RetUserDisconnect. */
    class RS2GW_RetUserDisconnect implements IRS2GW_RetUserDisconnect {

        /**
         * Constructs a new RS2GW_RetUserDisconnect.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRS2GW_RetUserDisconnect);

        /** RS2GW_RetUserDisconnect roomid. */
        public roomid: (number|Long);

        /** RS2GW_RetUserDisconnect userid. */
        public userid: (number|Long);

        /** RS2GW_RetUserDisconnect errcode. */
        public errcode: string;

        /**
         * Creates a new RS2GW_RetUserDisconnect instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RS2GW_RetUserDisconnect instance
         */
        public static create(properties?: msg.IRS2GW_RetUserDisconnect): msg.RS2GW_RetUserDisconnect;

        /**
         * Encodes the specified RS2GW_RetUserDisconnect message. Does not implicitly {@link msg.RS2GW_RetUserDisconnect.verify|verify} messages.
         * @param message RS2GW_RetUserDisconnect message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRS2GW_RetUserDisconnect, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified RS2GW_RetUserDisconnect message, length delimited. Does not implicitly {@link msg.RS2GW_RetUserDisconnect.verify|verify} messages.
         * @param message RS2GW_RetUserDisconnect message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRS2GW_RetUserDisconnect, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a RS2GW_RetUserDisconnect message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RS2GW_RetUserDisconnect
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.RS2GW_RetUserDisconnect;

        /**
         * Decodes a RS2GW_RetUserDisconnect message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RS2GW_RetUserDisconnect
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.RS2GW_RetUserDisconnect;

        /**
         * Verifies a RS2GW_RetUserDisconnect message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RS2GW_RetUserDisconnect message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RS2GW_RetUserDisconnect
         */
        public static fromObject(object: { [k: string]: any }): msg.RS2GW_RetUserDisconnect;

        /**
         * Creates a plain object from a RS2GW_RetUserDisconnect message. Also converts values to other types if specified.
         * @param message RS2GW_RetUserDisconnect
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RS2GW_RetUserDisconnect, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RS2GW_RetUserDisconnect to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_BuyItem. */
    interface IC2GW_BuyItem {

        /** C2GW_BuyItem productid */
        productid?: (number|null);

        /** C2GW_BuyItem num */
        num?: (number|null);
    }

    /** Represents a C2GW_BuyItem. */
    class C2GW_BuyItem implements IC2GW_BuyItem {

        /**
         * Constructs a new C2GW_BuyItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_BuyItem);

        /** C2GW_BuyItem productid. */
        public productid: number;

        /** C2GW_BuyItem num. */
        public num: number;

        /**
         * Creates a new C2GW_BuyItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_BuyItem instance
         */
        public static create(properties?: msg.IC2GW_BuyItem): msg.C2GW_BuyItem;

        /**
         * Encodes the specified C2GW_BuyItem message. Does not implicitly {@link msg.C2GW_BuyItem.verify|verify} messages.
         * @param message C2GW_BuyItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_BuyItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_BuyItem message, length delimited. Does not implicitly {@link msg.C2GW_BuyItem.verify|verify} messages.
         * @param message C2GW_BuyItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_BuyItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_BuyItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_BuyItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_BuyItem;

        /**
         * Decodes a C2GW_BuyItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_BuyItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_BuyItem;

        /**
         * Verifies a C2GW_BuyItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_BuyItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_BuyItem
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_BuyItem;

        /**
         * Creates a plain object from a C2GW_BuyItem message. Also converts values to other types if specified.
         * @param message C2GW_BuyItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_BuyItem, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_BuyItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_AddPackageItem. */
    interface IGW2C_AddPackageItem {

        /** GW2C_AddPackageItem itemid */
        itemid?: (number|null);

        /** GW2C_AddPackageItem num */
        num?: (number|null);
    }

    /** Represents a GW2C_AddPackageItem. */
    class GW2C_AddPackageItem implements IGW2C_AddPackageItem {

        /**
         * Constructs a new GW2C_AddPackageItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_AddPackageItem);

        /** GW2C_AddPackageItem itemid. */
        public itemid: number;

        /** GW2C_AddPackageItem num. */
        public num: number;

        /**
         * Creates a new GW2C_AddPackageItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_AddPackageItem instance
         */
        public static create(properties?: msg.IGW2C_AddPackageItem): msg.GW2C_AddPackageItem;

        /**
         * Encodes the specified GW2C_AddPackageItem message. Does not implicitly {@link msg.GW2C_AddPackageItem.verify|verify} messages.
         * @param message GW2C_AddPackageItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_AddPackageItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_AddPackageItem message, length delimited. Does not implicitly {@link msg.GW2C_AddPackageItem.verify|verify} messages.
         * @param message GW2C_AddPackageItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_AddPackageItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_AddPackageItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_AddPackageItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_AddPackageItem;

        /**
         * Decodes a GW2C_AddPackageItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_AddPackageItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_AddPackageItem;

        /**
         * Verifies a GW2C_AddPackageItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_AddPackageItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_AddPackageItem
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_AddPackageItem;

        /**
         * Creates a plain object from a GW2C_AddPackageItem message. Also converts values to other types if specified.
         * @param message GW2C_AddPackageItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_AddPackageItem, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_AddPackageItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_RemovePackageItem. */
    interface IGW2C_RemovePackageItem {

        /** GW2C_RemovePackageItem itemid */
        itemid?: (number|null);

        /** GW2C_RemovePackageItem num */
        num?: (number|null);
    }

    /** Represents a GW2C_RemovePackageItem. */
    class GW2C_RemovePackageItem implements IGW2C_RemovePackageItem {

        /**
         * Constructs a new GW2C_RemovePackageItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_RemovePackageItem);

        /** GW2C_RemovePackageItem itemid. */
        public itemid: number;

        /** GW2C_RemovePackageItem num. */
        public num: number;

        /**
         * Creates a new GW2C_RemovePackageItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_RemovePackageItem instance
         */
        public static create(properties?: msg.IGW2C_RemovePackageItem): msg.GW2C_RemovePackageItem;

        /**
         * Encodes the specified GW2C_RemovePackageItem message. Does not implicitly {@link msg.GW2C_RemovePackageItem.verify|verify} messages.
         * @param message GW2C_RemovePackageItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_RemovePackageItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_RemovePackageItem message, length delimited. Does not implicitly {@link msg.GW2C_RemovePackageItem.verify|verify} messages.
         * @param message GW2C_RemovePackageItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_RemovePackageItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_RemovePackageItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_RemovePackageItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_RemovePackageItem;

        /**
         * Decodes a GW2C_RemovePackageItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_RemovePackageItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_RemovePackageItem;

        /**
         * Verifies a GW2C_RemovePackageItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_RemovePackageItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_RemovePackageItem
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_RemovePackageItem;

        /**
         * Creates a plain object from a GW2C_RemovePackageItem message. Also converts values to other types if specified.
         * @param message GW2C_RemovePackageItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_RemovePackageItem, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_RemovePackageItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_UpdateYuanbao. */
    interface IGW2C_UpdateYuanbao {

        /** GW2C_UpdateYuanbao num */
        num?: (number|null);
    }

    /** Represents a GW2C_UpdateYuanbao. */
    class GW2C_UpdateYuanbao implements IGW2C_UpdateYuanbao {

        /**
         * Constructs a new GW2C_UpdateYuanbao.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_UpdateYuanbao);

        /** GW2C_UpdateYuanbao num. */
        public num: number;

        /**
         * Creates a new GW2C_UpdateYuanbao instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_UpdateYuanbao instance
         */
        public static create(properties?: msg.IGW2C_UpdateYuanbao): msg.GW2C_UpdateYuanbao;

        /**
         * Encodes the specified GW2C_UpdateYuanbao message. Does not implicitly {@link msg.GW2C_UpdateYuanbao.verify|verify} messages.
         * @param message GW2C_UpdateYuanbao message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_UpdateYuanbao, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_UpdateYuanbao message, length delimited. Does not implicitly {@link msg.GW2C_UpdateYuanbao.verify|verify} messages.
         * @param message GW2C_UpdateYuanbao message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_UpdateYuanbao, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_UpdateYuanbao message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_UpdateYuanbao
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_UpdateYuanbao;

        /**
         * Decodes a GW2C_UpdateYuanbao message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_UpdateYuanbao
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_UpdateYuanbao;

        /**
         * Verifies a GW2C_UpdateYuanbao message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_UpdateYuanbao message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_UpdateYuanbao
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_UpdateYuanbao;

        /**
         * Creates a plain object from a GW2C_UpdateYuanbao message. Also converts values to other types if specified.
         * @param message GW2C_UpdateYuanbao
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_UpdateYuanbao, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_UpdateYuanbao to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_UpdateCoupon. */
    interface IGW2C_UpdateCoupon {

        /** GW2C_UpdateCoupon num */
        num?: (number|null);
    }

    /** Represents a GW2C_UpdateCoupon. */
    class GW2C_UpdateCoupon implements IGW2C_UpdateCoupon {

        /**
         * Constructs a new GW2C_UpdateCoupon.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_UpdateCoupon);

        /** GW2C_UpdateCoupon num. */
        public num: number;

        /**
         * Creates a new GW2C_UpdateCoupon instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_UpdateCoupon instance
         */
        public static create(properties?: msg.IGW2C_UpdateCoupon): msg.GW2C_UpdateCoupon;

        /**
         * Encodes the specified GW2C_UpdateCoupon message. Does not implicitly {@link msg.GW2C_UpdateCoupon.verify|verify} messages.
         * @param message GW2C_UpdateCoupon message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_UpdateCoupon, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_UpdateCoupon message, length delimited. Does not implicitly {@link msg.GW2C_UpdateCoupon.verify|verify} messages.
         * @param message GW2C_UpdateCoupon message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_UpdateCoupon, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_UpdateCoupon message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_UpdateCoupon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_UpdateCoupon;

        /**
         * Decodes a GW2C_UpdateCoupon message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_UpdateCoupon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_UpdateCoupon;

        /**
         * Verifies a GW2C_UpdateCoupon message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_UpdateCoupon message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_UpdateCoupon
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_UpdateCoupon;

        /**
         * Creates a plain object from a GW2C_UpdateCoupon message. Also converts values to other types if specified.
         * @param message GW2C_UpdateCoupon
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_UpdateCoupon, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_UpdateCoupon to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_UpdateFreeStep. */
    interface IGW2C_UpdateFreeStep {

        /** GW2C_UpdateFreeStep num */
        num?: (number|null);
    }

    /** Represents a GW2C_UpdateFreeStep. */
    class GW2C_UpdateFreeStep implements IGW2C_UpdateFreeStep {

        /**
         * Constructs a new GW2C_UpdateFreeStep.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_UpdateFreeStep);

        /** GW2C_UpdateFreeStep num. */
        public num: number;

        /**
         * Creates a new GW2C_UpdateFreeStep instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_UpdateFreeStep instance
         */
        public static create(properties?: msg.IGW2C_UpdateFreeStep): msg.GW2C_UpdateFreeStep;

        /**
         * Encodes the specified GW2C_UpdateFreeStep message. Does not implicitly {@link msg.GW2C_UpdateFreeStep.verify|verify} messages.
         * @param message GW2C_UpdateFreeStep message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_UpdateFreeStep, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_UpdateFreeStep message, length delimited. Does not implicitly {@link msg.GW2C_UpdateFreeStep.verify|verify} messages.
         * @param message GW2C_UpdateFreeStep message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_UpdateFreeStep, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_UpdateFreeStep message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_UpdateFreeStep
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_UpdateFreeStep;

        /**
         * Decodes a GW2C_UpdateFreeStep message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_UpdateFreeStep
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_UpdateFreeStep;

        /**
         * Verifies a GW2C_UpdateFreeStep message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_UpdateFreeStep message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_UpdateFreeStep
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_UpdateFreeStep;

        /**
         * Creates a plain object from a GW2C_UpdateFreeStep message. Also converts values to other types if specified.
         * @param message GW2C_UpdateFreeStep
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_UpdateFreeStep, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_UpdateFreeStep to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DeliveryGoods. */
    interface IDeliveryGoods {

        /** DeliveryGoods itemid */
        itemid?: (number|null);

        /** DeliveryGoods num */
        num?: (number|null);
    }

    /** Represents a DeliveryGoods. */
    class DeliveryGoods implements IDeliveryGoods {

        /**
         * Constructs a new DeliveryGoods.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IDeliveryGoods);

        /** DeliveryGoods itemid. */
        public itemid: number;

        /** DeliveryGoods num. */
        public num: number;

        /**
         * Creates a new DeliveryGoods instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DeliveryGoods instance
         */
        public static create(properties?: msg.IDeliveryGoods): msg.DeliveryGoods;

        /**
         * Encodes the specified DeliveryGoods message. Does not implicitly {@link msg.DeliveryGoods.verify|verify} messages.
         * @param message DeliveryGoods message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IDeliveryGoods, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified DeliveryGoods message, length delimited. Does not implicitly {@link msg.DeliveryGoods.verify|verify} messages.
         * @param message DeliveryGoods message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IDeliveryGoods, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a DeliveryGoods message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DeliveryGoods
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.DeliveryGoods;

        /**
         * Decodes a DeliveryGoods message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DeliveryGoods
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.DeliveryGoods;

        /**
         * Verifies a DeliveryGoods message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DeliveryGoods message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DeliveryGoods
         */
        public static fromObject(object: { [k: string]: any }): msg.DeliveryGoods;

        /**
         * Creates a plain object from a DeliveryGoods message. Also converts values to other types if specified.
         * @param message DeliveryGoods
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.DeliveryGoods, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DeliveryGoods to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_ReqDeliveryGoods. */
    interface IC2GW_ReqDeliveryGoods {

        /** C2GW_ReqDeliveryGoods list */
        list?: (msg.IDeliveryGoods[]|null);

        /** C2GW_ReqDeliveryGoods token */
        token?: (string|null);
    }

    /** Represents a C2GW_ReqDeliveryGoods. */
    class C2GW_ReqDeliveryGoods implements IC2GW_ReqDeliveryGoods {

        /**
         * Constructs a new C2GW_ReqDeliveryGoods.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_ReqDeliveryGoods);

        /** C2GW_ReqDeliveryGoods list. */
        public list: msg.IDeliveryGoods[];

        /** C2GW_ReqDeliveryGoods token. */
        public token: string;

        /**
         * Creates a new C2GW_ReqDeliveryGoods instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_ReqDeliveryGoods instance
         */
        public static create(properties?: msg.IC2GW_ReqDeliveryGoods): msg.C2GW_ReqDeliveryGoods;

        /**
         * Encodes the specified C2GW_ReqDeliveryGoods message. Does not implicitly {@link msg.C2GW_ReqDeliveryGoods.verify|verify} messages.
         * @param message C2GW_ReqDeliveryGoods message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_ReqDeliveryGoods, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_ReqDeliveryGoods message, length delimited. Does not implicitly {@link msg.C2GW_ReqDeliveryGoods.verify|verify} messages.
         * @param message C2GW_ReqDeliveryGoods message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_ReqDeliveryGoods, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_ReqDeliveryGoods message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_ReqDeliveryGoods
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_ReqDeliveryGoods;

        /**
         * Decodes a C2GW_ReqDeliveryGoods message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_ReqDeliveryGoods
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_ReqDeliveryGoods;

        /**
         * Verifies a C2GW_ReqDeliveryGoods message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_ReqDeliveryGoods message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_ReqDeliveryGoods
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_ReqDeliveryGoods;

        /**
         * Creates a plain object from a C2GW_ReqDeliveryGoods message. Also converts values to other types if specified.
         * @param message C2GW_ReqDeliveryGoods
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_ReqDeliveryGoods, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_ReqDeliveryGoods to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BigRewardItem. */
    interface IBigRewardItem {

        /** BigRewardItem id */
        id?: (number|null);

        /** BigRewardItem num */
        num?: (number|null);
    }

    /** Represents a BigRewardItem. */
    class BigRewardItem implements IBigRewardItem {

        /**
         * Constructs a new BigRewardItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IBigRewardItem);

        /** BigRewardItem id. */
        public id: number;

        /** BigRewardItem num. */
        public num: number;

        /**
         * Creates a new BigRewardItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BigRewardItem instance
         */
        public static create(properties?: msg.IBigRewardItem): msg.BigRewardItem;

        /**
         * Encodes the specified BigRewardItem message. Does not implicitly {@link msg.BigRewardItem.verify|verify} messages.
         * @param message BigRewardItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IBigRewardItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified BigRewardItem message, length delimited. Does not implicitly {@link msg.BigRewardItem.verify|verify} messages.
         * @param message BigRewardItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IBigRewardItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a BigRewardItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BigRewardItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.BigRewardItem;

        /**
         * Decodes a BigRewardItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BigRewardItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.BigRewardItem;

        /**
         * Verifies a BigRewardItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BigRewardItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BigRewardItem
         */
        public static fromObject(object: { [k: string]: any }): msg.BigRewardItem;

        /**
         * Creates a plain object from a BigRewardItem message. Also converts values to other types if specified.
         * @param message BigRewardItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.BigRewardItem, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BigRewardItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Sync_BigRewardPickNum. */
    interface ISync_BigRewardPickNum {

        /** Sync_BigRewardPickNum list */
        list?: (msg.IBigRewardItem[]|null);
    }

    /** Represents a Sync_BigRewardPickNum. */
    class Sync_BigRewardPickNum implements ISync_BigRewardPickNum {

        /**
         * Constructs a new Sync_BigRewardPickNum.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.ISync_BigRewardPickNum);

        /** Sync_BigRewardPickNum list. */
        public list: msg.IBigRewardItem[];

        /**
         * Creates a new Sync_BigRewardPickNum instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Sync_BigRewardPickNum instance
         */
        public static create(properties?: msg.ISync_BigRewardPickNum): msg.Sync_BigRewardPickNum;

        /**
         * Encodes the specified Sync_BigRewardPickNum message. Does not implicitly {@link msg.Sync_BigRewardPickNum.verify|verify} messages.
         * @param message Sync_BigRewardPickNum message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.ISync_BigRewardPickNum, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified Sync_BigRewardPickNum message, length delimited. Does not implicitly {@link msg.Sync_BigRewardPickNum.verify|verify} messages.
         * @param message Sync_BigRewardPickNum message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.ISync_BigRewardPickNum, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a Sync_BigRewardPickNum message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Sync_BigRewardPickNum
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.Sync_BigRewardPickNum;

        /**
         * Decodes a Sync_BigRewardPickNum message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Sync_BigRewardPickNum
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.Sync_BigRewardPickNum;

        /**
         * Verifies a Sync_BigRewardPickNum message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Sync_BigRewardPickNum message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Sync_BigRewardPickNum
         */
        public static fromObject(object: { [k: string]: any }): msg.Sync_BigRewardPickNum;

        /**
         * Creates a plain object from a Sync_BigRewardPickNum message. Also converts values to other types if specified.
         * @param message Sync_BigRewardPickNum
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.Sync_BigRewardPickNum, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Sync_BigRewardPickNum to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_UseBagItem. */
    interface IC2GW_UseBagItem {

        /** C2GW_UseBagItem itemid */
        itemid?: (number|null);

        /** C2GW_UseBagItem num */
        num?: (number|null);
    }

    /** Represents a C2GW_UseBagItem. */
    class C2GW_UseBagItem implements IC2GW_UseBagItem {

        /**
         * Constructs a new C2GW_UseBagItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_UseBagItem);

        /** C2GW_UseBagItem itemid. */
        public itemid: number;

        /** C2GW_UseBagItem num. */
        public num: number;

        /**
         * Creates a new C2GW_UseBagItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_UseBagItem instance
         */
        public static create(properties?: msg.IC2GW_UseBagItem): msg.C2GW_UseBagItem;

        /**
         * Encodes the specified C2GW_UseBagItem message. Does not implicitly {@link msg.C2GW_UseBagItem.verify|verify} messages.
         * @param message C2GW_UseBagItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_UseBagItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_UseBagItem message, length delimited. Does not implicitly {@link msg.C2GW_UseBagItem.verify|verify} messages.
         * @param message C2GW_UseBagItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_UseBagItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_UseBagItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_UseBagItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_UseBagItem;

        /**
         * Decodes a C2GW_UseBagItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_UseBagItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_UseBagItem;

        /**
         * Verifies a C2GW_UseBagItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_UseBagItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_UseBagItem
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_UseBagItem;

        /**
         * Creates a plain object from a C2GW_UseBagItem message. Also converts values to other types if specified.
         * @param message C2GW_UseBagItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_UseBagItem, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_UseBagItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_SellBagItem. */
    interface IC2GW_SellBagItem {

        /** C2GW_SellBagItem list */
        list?: (msg.IPairNumItem[]|null);
    }

    /** Represents a C2GW_SellBagItem. */
    class C2GW_SellBagItem implements IC2GW_SellBagItem {

        /**
         * Constructs a new C2GW_SellBagItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_SellBagItem);

        /** C2GW_SellBagItem list. */
        public list: msg.IPairNumItem[];

        /**
         * Creates a new C2GW_SellBagItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_SellBagItem instance
         */
        public static create(properties?: msg.IC2GW_SellBagItem): msg.C2GW_SellBagItem;

        /**
         * Encodes the specified C2GW_SellBagItem message. Does not implicitly {@link msg.C2GW_SellBagItem.verify|verify} messages.
         * @param message C2GW_SellBagItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_SellBagItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_SellBagItem message, length delimited. Does not implicitly {@link msg.C2GW_SellBagItem.verify|verify} messages.
         * @param message C2GW_SellBagItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_SellBagItem, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_SellBagItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_SellBagItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_SellBagItem;

        /**
         * Decodes a C2GW_SellBagItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_SellBagItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_SellBagItem;

        /**
         * Verifies a C2GW_SellBagItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_SellBagItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_SellBagItem
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_SellBagItem;

        /**
         * Creates a plain object from a C2GW_SellBagItem message. Also converts values to other types if specified.
         * @param message C2GW_SellBagItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_SellBagItem, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_SellBagItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RS2MS_ReqRegist. */
    interface IRS2MS_ReqRegist {

        /** RS2MS_ReqRegist account */
        account?: (string|null);

        /** RS2MS_ReqRegist passwd */
        passwd?: (string|null);

        /** RS2MS_ReqRegist name */
        name?: (string|null);
    }

    /** Represents a RS2MS_ReqRegist. */
    class RS2MS_ReqRegist implements IRS2MS_ReqRegist {

        /**
         * Constructs a new RS2MS_ReqRegist.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRS2MS_ReqRegist);

        /** RS2MS_ReqRegist account. */
        public account: string;

        /** RS2MS_ReqRegist passwd. */
        public passwd: string;

        /** RS2MS_ReqRegist name. */
        public name: string;

        /**
         * Creates a new RS2MS_ReqRegist instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RS2MS_ReqRegist instance
         */
        public static create(properties?: msg.IRS2MS_ReqRegist): msg.RS2MS_ReqRegist;

        /**
         * Encodes the specified RS2MS_ReqRegist message. Does not implicitly {@link msg.RS2MS_ReqRegist.verify|verify} messages.
         * @param message RS2MS_ReqRegist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRS2MS_ReqRegist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified RS2MS_ReqRegist message, length delimited. Does not implicitly {@link msg.RS2MS_ReqRegist.verify|verify} messages.
         * @param message RS2MS_ReqRegist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRS2MS_ReqRegist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a RS2MS_ReqRegist message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RS2MS_ReqRegist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.RS2MS_ReqRegist;

        /**
         * Decodes a RS2MS_ReqRegist message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RS2MS_ReqRegist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.RS2MS_ReqRegist;

        /**
         * Verifies a RS2MS_ReqRegist message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RS2MS_ReqRegist message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RS2MS_ReqRegist
         */
        public static fromObject(object: { [k: string]: any }): msg.RS2MS_ReqRegist;

        /**
         * Creates a plain object from a RS2MS_ReqRegist message. Also converts values to other types if specified.
         * @param message RS2MS_ReqRegist
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RS2MS_ReqRegist, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RS2MS_ReqRegist to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MS2RS_RetRegist. */
    interface IMS2RS_RetRegist {

        /** MS2RS_RetRegist errcode */
        errcode?: (string|null);
    }

    /** Represents a MS2RS_RetRegist. */
    class MS2RS_RetRegist implements IMS2RS_RetRegist {

        /**
         * Constructs a new MS2RS_RetRegist.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IMS2RS_RetRegist);

        /** MS2RS_RetRegist errcode. */
        public errcode: string;

        /**
         * Creates a new MS2RS_RetRegist instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MS2RS_RetRegist instance
         */
        public static create(properties?: msg.IMS2RS_RetRegist): msg.MS2RS_RetRegist;

        /**
         * Encodes the specified MS2RS_RetRegist message. Does not implicitly {@link msg.MS2RS_RetRegist.verify|verify} messages.
         * @param message MS2RS_RetRegist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IMS2RS_RetRegist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified MS2RS_RetRegist message, length delimited. Does not implicitly {@link msg.MS2RS_RetRegist.verify|verify} messages.
         * @param message MS2RS_RetRegist message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IMS2RS_RetRegist, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a MS2RS_RetRegist message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MS2RS_RetRegist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.MS2RS_RetRegist;

        /**
         * Decodes a MS2RS_RetRegist message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MS2RS_RetRegist
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.MS2RS_RetRegist;

        /**
         * Verifies a MS2RS_RetRegist message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MS2RS_RetRegist message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MS2RS_RetRegist
         */
        public static fromObject(object: { [k: string]: any }): msg.MS2RS_RetRegist;

        /**
         * Creates a plain object from a MS2RS_RetRegist message. Also converts values to other types if specified.
         * @param message MS2RS_RetRegist
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.MS2RS_RetRegist, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MS2RS_RetRegist to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RS2MS_HeartBeat. */
    interface IRS2MS_HeartBeat {
    }

    /** Represents a RS2MS_HeartBeat. */
    class RS2MS_HeartBeat implements IRS2MS_HeartBeat {

        /**
         * Constructs a new RS2MS_HeartBeat.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRS2MS_HeartBeat);

        /**
         * Creates a new RS2MS_HeartBeat instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RS2MS_HeartBeat instance
         */
        public static create(properties?: msg.IRS2MS_HeartBeat): msg.RS2MS_HeartBeat;

        /**
         * Encodes the specified RS2MS_HeartBeat message. Does not implicitly {@link msg.RS2MS_HeartBeat.verify|verify} messages.
         * @param message RS2MS_HeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRS2MS_HeartBeat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified RS2MS_HeartBeat message, length delimited. Does not implicitly {@link msg.RS2MS_HeartBeat.verify|verify} messages.
         * @param message RS2MS_HeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRS2MS_HeartBeat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a RS2MS_HeartBeat message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RS2MS_HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.RS2MS_HeartBeat;

        /**
         * Decodes a RS2MS_HeartBeat message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RS2MS_HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.RS2MS_HeartBeat;

        /**
         * Verifies a RS2MS_HeartBeat message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RS2MS_HeartBeat message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RS2MS_HeartBeat
         */
        public static fromObject(object: { [k: string]: any }): msg.RS2MS_HeartBeat;

        /**
         * Creates a plain object from a RS2MS_HeartBeat message. Also converts values to other types if specified.
         * @param message RS2MS_HeartBeat
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RS2MS_HeartBeat, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RS2MS_HeartBeat to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MS2RS_HeartBeat. */
    interface IMS2RS_HeartBeat {
    }

    /** Represents a MS2RS_HeartBeat. */
    class MS2RS_HeartBeat implements IMS2RS_HeartBeat {

        /**
         * Constructs a new MS2RS_HeartBeat.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IMS2RS_HeartBeat);

        /**
         * Creates a new MS2RS_HeartBeat instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MS2RS_HeartBeat instance
         */
        public static create(properties?: msg.IMS2RS_HeartBeat): msg.MS2RS_HeartBeat;

        /**
         * Encodes the specified MS2RS_HeartBeat message. Does not implicitly {@link msg.MS2RS_HeartBeat.verify|verify} messages.
         * @param message MS2RS_HeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IMS2RS_HeartBeat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified MS2RS_HeartBeat message, length delimited. Does not implicitly {@link msg.MS2RS_HeartBeat.verify|verify} messages.
         * @param message MS2RS_HeartBeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IMS2RS_HeartBeat, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a MS2RS_HeartBeat message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MS2RS_HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.MS2RS_HeartBeat;

        /**
         * Decodes a MS2RS_HeartBeat message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MS2RS_HeartBeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.MS2RS_HeartBeat;

        /**
         * Verifies a MS2RS_HeartBeat message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MS2RS_HeartBeat message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MS2RS_HeartBeat
         */
        public static fromObject(object: { [k: string]: any }): msg.MS2RS_HeartBeat;

        /**
         * Creates a plain object from a MS2RS_HeartBeat message. Also converts values to other types if specified.
         * @param message MS2RS_HeartBeat
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.MS2RS_HeartBeat, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MS2RS_HeartBeat to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GateSimpleInfo. */
    interface IGateSimpleInfo {

        /** GateSimpleInfo name */
        name?: (string|null);

        /** GateSimpleInfo host */
        host?: (msg.IIpHost|null);
    }

    /** Represents a GateSimpleInfo. */
    class GateSimpleInfo implements IGateSimpleInfo {

        /**
         * Constructs a new GateSimpleInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGateSimpleInfo);

        /** GateSimpleInfo name. */
        public name: string;

        /** GateSimpleInfo host. */
        public host?: (msg.IIpHost|null);

        /**
         * Creates a new GateSimpleInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GateSimpleInfo instance
         */
        public static create(properties?: msg.IGateSimpleInfo): msg.GateSimpleInfo;

        /**
         * Encodes the specified GateSimpleInfo message. Does not implicitly {@link msg.GateSimpleInfo.verify|verify} messages.
         * @param message GateSimpleInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGateSimpleInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GateSimpleInfo message, length delimited. Does not implicitly {@link msg.GateSimpleInfo.verify|verify} messages.
         * @param message GateSimpleInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGateSimpleInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GateSimpleInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GateSimpleInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GateSimpleInfo;

        /**
         * Decodes a GateSimpleInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GateSimpleInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GateSimpleInfo;

        /**
         * Verifies a GateSimpleInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GateSimpleInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GateSimpleInfo
         */
        public static fromObject(object: { [k: string]: any }): msg.GateSimpleInfo;

        /**
         * Creates a plain object from a GateSimpleInfo message. Also converts values to other types if specified.
         * @param message GateSimpleInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GateSimpleInfo, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GateSimpleInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MS2RS_GateInfo. */
    interface IMS2RS_GateInfo {

        /** MS2RS_GateInfo gates */
        gates?: (msg.IGateSimpleInfo[]|null);
    }

    /** Represents a MS2RS_GateInfo. */
    class MS2RS_GateInfo implements IMS2RS_GateInfo {

        /**
         * Constructs a new MS2RS_GateInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IMS2RS_GateInfo);

        /** MS2RS_GateInfo gates. */
        public gates: msg.IGateSimpleInfo[];

        /**
         * Creates a new MS2RS_GateInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MS2RS_GateInfo instance
         */
        public static create(properties?: msg.IMS2RS_GateInfo): msg.MS2RS_GateInfo;

        /**
         * Encodes the specified MS2RS_GateInfo message. Does not implicitly {@link msg.MS2RS_GateInfo.verify|verify} messages.
         * @param message MS2RS_GateInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IMS2RS_GateInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified MS2RS_GateInfo message, length delimited. Does not implicitly {@link msg.MS2RS_GateInfo.verify|verify} messages.
         * @param message MS2RS_GateInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IMS2RS_GateInfo, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a MS2RS_GateInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MS2RS_GateInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.MS2RS_GateInfo;

        /**
         * Decodes a MS2RS_GateInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MS2RS_GateInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.MS2RS_GateInfo;

        /**
         * Verifies a MS2RS_GateInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MS2RS_GateInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MS2RS_GateInfo
         */
        public static fromObject(object: { [k: string]: any }): msg.MS2RS_GateInfo;

        /**
         * Creates a plain object from a MS2RS_GateInfo message. Also converts values to other types if specified.
         * @param message MS2RS_GateInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.MS2RS_GateInfo, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MS2RS_GateInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MS2RS_CreateRoom. */
    interface IMS2RS_CreateRoom {

        /** MS2RS_CreateRoom userid */
        userid?: (number|Long|null);

        /** MS2RS_CreateRoom roomid */
        roomid?: (number|Long|null);

        /** MS2RS_CreateRoom gamekind */
        gamekind?: (number|null);

        /** MS2RS_CreateRoom gridnum */
        gridnum?: (number|null);

        /** MS2RS_CreateRoom sidgate */
        sidgate?: (number|null);

        /** MS2RS_CreateRoom quotaflag */
        quotaflag?: (boolean|null);
    }

    /** Represents a MS2RS_CreateRoom. */
    class MS2RS_CreateRoom implements IMS2RS_CreateRoom {

        /**
         * Constructs a new MS2RS_CreateRoom.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IMS2RS_CreateRoom);

        /** MS2RS_CreateRoom userid. */
        public userid: (number|Long);

        /** MS2RS_CreateRoom roomid. */
        public roomid: (number|Long);

        /** MS2RS_CreateRoom gamekind. */
        public gamekind: number;

        /** MS2RS_CreateRoom gridnum. */
        public gridnum: number;

        /** MS2RS_CreateRoom sidgate. */
        public sidgate: number;

        /** MS2RS_CreateRoom quotaflag. */
        public quotaflag: boolean;

        /**
         * Creates a new MS2RS_CreateRoom instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MS2RS_CreateRoom instance
         */
        public static create(properties?: msg.IMS2RS_CreateRoom): msg.MS2RS_CreateRoom;

        /**
         * Encodes the specified MS2RS_CreateRoom message. Does not implicitly {@link msg.MS2RS_CreateRoom.verify|verify} messages.
         * @param message MS2RS_CreateRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IMS2RS_CreateRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified MS2RS_CreateRoom message, length delimited. Does not implicitly {@link msg.MS2RS_CreateRoom.verify|verify} messages.
         * @param message MS2RS_CreateRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IMS2RS_CreateRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a MS2RS_CreateRoom message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MS2RS_CreateRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.MS2RS_CreateRoom;

        /**
         * Decodes a MS2RS_CreateRoom message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MS2RS_CreateRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.MS2RS_CreateRoom;

        /**
         * Verifies a MS2RS_CreateRoom message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MS2RS_CreateRoom message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MS2RS_CreateRoom
         */
        public static fromObject(object: { [k: string]: any }): msg.MS2RS_CreateRoom;

        /**
         * Creates a plain object from a MS2RS_CreateRoom message. Also converts values to other types if specified.
         * @param message MS2RS_CreateRoom
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.MS2RS_CreateRoom, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MS2RS_CreateRoom to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RS2MS_RetCreateRoom. */
    interface IRS2MS_RetCreateRoom {

        /** RS2MS_RetCreateRoom roomid */
        roomid?: (number|Long|null);

        /** RS2MS_RetCreateRoom userid */
        userid?: (number|Long|null);

        /** RS2MS_RetCreateRoom sidgate */
        sidgate?: (number|null);

        /** RS2MS_RetCreateRoom errcode */
        errcode?: (string|null);
    }

    /** Represents a RS2MS_RetCreateRoom. */
    class RS2MS_RetCreateRoom implements IRS2MS_RetCreateRoom {

        /**
         * Constructs a new RS2MS_RetCreateRoom.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRS2MS_RetCreateRoom);

        /** RS2MS_RetCreateRoom roomid. */
        public roomid: (number|Long);

        /** RS2MS_RetCreateRoom userid. */
        public userid: (number|Long);

        /** RS2MS_RetCreateRoom sidgate. */
        public sidgate: number;

        /** RS2MS_RetCreateRoom errcode. */
        public errcode: string;

        /**
         * Creates a new RS2MS_RetCreateRoom instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RS2MS_RetCreateRoom instance
         */
        public static create(properties?: msg.IRS2MS_RetCreateRoom): msg.RS2MS_RetCreateRoom;

        /**
         * Encodes the specified RS2MS_RetCreateRoom message. Does not implicitly {@link msg.RS2MS_RetCreateRoom.verify|verify} messages.
         * @param message RS2MS_RetCreateRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRS2MS_RetCreateRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified RS2MS_RetCreateRoom message, length delimited. Does not implicitly {@link msg.RS2MS_RetCreateRoom.verify|verify} messages.
         * @param message RS2MS_RetCreateRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRS2MS_RetCreateRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a RS2MS_RetCreateRoom message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RS2MS_RetCreateRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.RS2MS_RetCreateRoom;

        /**
         * Decodes a RS2MS_RetCreateRoom message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RS2MS_RetCreateRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.RS2MS_RetCreateRoom;

        /**
         * Verifies a RS2MS_RetCreateRoom message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RS2MS_RetCreateRoom message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RS2MS_RetCreateRoom
         */
        public static fromObject(object: { [k: string]: any }): msg.RS2MS_RetCreateRoom;

        /**
         * Creates a plain object from a RS2MS_RetCreateRoom message. Also converts values to other types if specified.
         * @param message RS2MS_RetCreateRoom
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RS2MS_RetCreateRoom, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RS2MS_RetCreateRoom to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RS2MS_DeleteRoom. */
    interface IRS2MS_DeleteRoom {

        /** RS2MS_DeleteRoom roomid */
        roomid?: (number|Long|null);
    }

    /** Represents a RS2MS_DeleteRoom. */
    class RS2MS_DeleteRoom implements IRS2MS_DeleteRoom {

        /**
         * Constructs a new RS2MS_DeleteRoom.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRS2MS_DeleteRoom);

        /** RS2MS_DeleteRoom roomid. */
        public roomid: (number|Long);

        /**
         * Creates a new RS2MS_DeleteRoom instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RS2MS_DeleteRoom instance
         */
        public static create(properties?: msg.IRS2MS_DeleteRoom): msg.RS2MS_DeleteRoom;

        /**
         * Encodes the specified RS2MS_DeleteRoom message. Does not implicitly {@link msg.RS2MS_DeleteRoom.verify|verify} messages.
         * @param message RS2MS_DeleteRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRS2MS_DeleteRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified RS2MS_DeleteRoom message, length delimited. Does not implicitly {@link msg.RS2MS_DeleteRoom.verify|verify} messages.
         * @param message RS2MS_DeleteRoom message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRS2MS_DeleteRoom, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a RS2MS_DeleteRoom message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RS2MS_DeleteRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.RS2MS_DeleteRoom;

        /**
         * Decodes a RS2MS_DeleteRoom message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RS2MS_DeleteRoom
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.RS2MS_DeleteRoom;

        /**
         * Verifies a RS2MS_DeleteRoom message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RS2MS_DeleteRoom message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RS2MS_DeleteRoom
         */
        public static fromObject(object: { [k: string]: any }): msg.RS2MS_DeleteRoom;

        /**
         * Creates a plain object from a RS2MS_DeleteRoom message. Also converts values to other types if specified.
         * @param message RS2MS_DeleteRoom
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RS2MS_DeleteRoom, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RS2MS_DeleteRoom to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RS2MS_UpdateRewardPool. */
    interface IRS2MS_UpdateRewardPool {

        /** RS2MS_UpdateRewardPool mapid */
        mapid?: (number|null);

        /** RS2MS_UpdateRewardPool cost */
        cost?: (number|null);
    }

    /** Represents a RS2MS_UpdateRewardPool. */
    class RS2MS_UpdateRewardPool implements IRS2MS_UpdateRewardPool {

        /**
         * Constructs a new RS2MS_UpdateRewardPool.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRS2MS_UpdateRewardPool);

        /** RS2MS_UpdateRewardPool mapid. */
        public mapid: number;

        /** RS2MS_UpdateRewardPool cost. */
        public cost: number;

        /**
         * Creates a new RS2MS_UpdateRewardPool instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RS2MS_UpdateRewardPool instance
         */
        public static create(properties?: msg.IRS2MS_UpdateRewardPool): msg.RS2MS_UpdateRewardPool;

        /**
         * Encodes the specified RS2MS_UpdateRewardPool message. Does not implicitly {@link msg.RS2MS_UpdateRewardPool.verify|verify} messages.
         * @param message RS2MS_UpdateRewardPool message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRS2MS_UpdateRewardPool, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified RS2MS_UpdateRewardPool message, length delimited. Does not implicitly {@link msg.RS2MS_UpdateRewardPool.verify|verify} messages.
         * @param message RS2MS_UpdateRewardPool message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRS2MS_UpdateRewardPool, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a RS2MS_UpdateRewardPool message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RS2MS_UpdateRewardPool
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.RS2MS_UpdateRewardPool;

        /**
         * Decodes a RS2MS_UpdateRewardPool message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RS2MS_UpdateRewardPool
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.RS2MS_UpdateRewardPool;

        /**
         * Verifies a RS2MS_UpdateRewardPool message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RS2MS_UpdateRewardPool message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RS2MS_UpdateRewardPool
         */
        public static fromObject(object: { [k: string]: any }): msg.RS2MS_UpdateRewardPool;

        /**
         * Creates a plain object from a RS2MS_UpdateRewardPool message. Also converts values to other types if specified.
         * @param message RS2MS_UpdateRewardPool
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RS2MS_UpdateRewardPool, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RS2MS_UpdateRewardPool to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_MsgNotify. */
    interface IGW2C_MsgNotify {

        /** GW2C_MsgNotify userid */
        userid?: (number|Long|null);

        /** GW2C_MsgNotify text */
        text?: (string|null);
    }

    /** Represents a GW2C_MsgNotify. */
    class GW2C_MsgNotify implements IGW2C_MsgNotify {

        /**
         * Constructs a new GW2C_MsgNotify.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_MsgNotify);

        /** GW2C_MsgNotify userid. */
        public userid: (number|Long);

        /** GW2C_MsgNotify text. */
        public text: string;

        /**
         * Creates a new GW2C_MsgNotify instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_MsgNotify instance
         */
        public static create(properties?: msg.IGW2C_MsgNotify): msg.GW2C_MsgNotify;

        /**
         * Encodes the specified GW2C_MsgNotify message. Does not implicitly {@link msg.GW2C_MsgNotify.verify|verify} messages.
         * @param message GW2C_MsgNotify message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_MsgNotify, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_MsgNotify message, length delimited. Does not implicitly {@link msg.GW2C_MsgNotify.verify|verify} messages.
         * @param message GW2C_MsgNotify message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_MsgNotify, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_MsgNotify message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_MsgNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_MsgNotify;

        /**
         * Decodes a GW2C_MsgNotify message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_MsgNotify
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_MsgNotify;

        /**
         * Verifies a GW2C_MsgNotify message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_MsgNotify message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_MsgNotify
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_MsgNotify;

        /**
         * Creates a plain object from a GW2C_MsgNotify message. Also converts values to other types if specified.
         * @param message GW2C_MsgNotify
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_MsgNotify, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_MsgNotify to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** NoticeType enum. */
    enum NoticeType {
        Suspension = 1,
        Marquee = 2
    }

    /** Properties of a GW2C_MsgNotice. */
    interface IGW2C_MsgNotice {

        /** GW2C_MsgNotice userid */
        userid?: (number|Long|null);

        /** GW2C_MsgNotice face */
        face?: (string|null);

        /** GW2C_MsgNotice name */
        name?: (string|null);

        /** GW2C_MsgNotice type */
        type?: (number|null);

        /** GW2C_MsgNotice text */
        text?: (string|null);
    }

    /** Represents a GW2C_MsgNotice. */
    class GW2C_MsgNotice implements IGW2C_MsgNotice {

        /**
         * Constructs a new GW2C_MsgNotice.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_MsgNotice);

        /** GW2C_MsgNotice userid. */
        public userid: (number|Long);

        /** GW2C_MsgNotice face. */
        public face: string;

        /** GW2C_MsgNotice name. */
        public name: string;

        /** GW2C_MsgNotice type. */
        public type: number;

        /** GW2C_MsgNotice text. */
        public text: string;

        /**
         * Creates a new GW2C_MsgNotice instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_MsgNotice instance
         */
        public static create(properties?: msg.IGW2C_MsgNotice): msg.GW2C_MsgNotice;

        /**
         * Encodes the specified GW2C_MsgNotice message. Does not implicitly {@link msg.GW2C_MsgNotice.verify|verify} messages.
         * @param message GW2C_MsgNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_MsgNotice, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_MsgNotice message, length delimited. Does not implicitly {@link msg.GW2C_MsgNotice.verify|verify} messages.
         * @param message GW2C_MsgNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_MsgNotice, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_MsgNotice message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_MsgNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_MsgNotice;

        /**
         * Decodes a GW2C_MsgNotice message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_MsgNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_MsgNotice;

        /**
         * Verifies a GW2C_MsgNotice message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_MsgNotice message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_MsgNotice
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_MsgNotice;

        /**
         * Creates a plain object from a GW2C_MsgNotice message. Also converts values to other types if specified.
         * @param message GW2C_MsgNotice
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_MsgNotice, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_MsgNotice to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2MS_MsgNotice. */
    interface IGW2MS_MsgNotice {

        /** GW2MS_MsgNotice notice */
        notice?: (msg.IGW2C_MsgNotice|null);
    }

    /** Represents a GW2MS_MsgNotice. */
    class GW2MS_MsgNotice implements IGW2MS_MsgNotice {

        /**
         * Constructs a new GW2MS_MsgNotice.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2MS_MsgNotice);

        /** GW2MS_MsgNotice notice. */
        public notice?: (msg.IGW2C_MsgNotice|null);

        /**
         * Creates a new GW2MS_MsgNotice instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2MS_MsgNotice instance
         */
        public static create(properties?: msg.IGW2MS_MsgNotice): msg.GW2MS_MsgNotice;

        /**
         * Encodes the specified GW2MS_MsgNotice message. Does not implicitly {@link msg.GW2MS_MsgNotice.verify|verify} messages.
         * @param message GW2MS_MsgNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2MS_MsgNotice, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2MS_MsgNotice message, length delimited. Does not implicitly {@link msg.GW2MS_MsgNotice.verify|verify} messages.
         * @param message GW2MS_MsgNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2MS_MsgNotice, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2MS_MsgNotice message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2MS_MsgNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2MS_MsgNotice;

        /**
         * Decodes a GW2MS_MsgNotice message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2MS_MsgNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2MS_MsgNotice;

        /**
         * Verifies a GW2MS_MsgNotice message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2MS_MsgNotice message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2MS_MsgNotice
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2MS_MsgNotice;

        /**
         * Creates a plain object from a GW2MS_MsgNotice message. Also converts values to other types if specified.
         * @param message GW2MS_MsgNotice
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2MS_MsgNotice, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2MS_MsgNotice to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RS2MS_MsgNotice. */
    interface IRS2MS_MsgNotice {

        /** RS2MS_MsgNotice notice */
        notice?: (msg.IGW2C_MsgNotice|null);
    }

    /** Represents a RS2MS_MsgNotice. */
    class RS2MS_MsgNotice implements IRS2MS_MsgNotice {

        /**
         * Constructs a new RS2MS_MsgNotice.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IRS2MS_MsgNotice);

        /** RS2MS_MsgNotice notice. */
        public notice?: (msg.IGW2C_MsgNotice|null);

        /**
         * Creates a new RS2MS_MsgNotice instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RS2MS_MsgNotice instance
         */
        public static create(properties?: msg.IRS2MS_MsgNotice): msg.RS2MS_MsgNotice;

        /**
         * Encodes the specified RS2MS_MsgNotice message. Does not implicitly {@link msg.RS2MS_MsgNotice.verify|verify} messages.
         * @param message RS2MS_MsgNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IRS2MS_MsgNotice, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified RS2MS_MsgNotice message, length delimited. Does not implicitly {@link msg.RS2MS_MsgNotice.verify|verify} messages.
         * @param message RS2MS_MsgNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IRS2MS_MsgNotice, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a RS2MS_MsgNotice message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RS2MS_MsgNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.RS2MS_MsgNotice;

        /**
         * Decodes a RS2MS_MsgNotice message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RS2MS_MsgNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.RS2MS_MsgNotice;

        /**
         * Verifies a RS2MS_MsgNotice message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RS2MS_MsgNotice message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RS2MS_MsgNotice
         */
        public static fromObject(object: { [k: string]: any }): msg.RS2MS_MsgNotice;

        /**
         * Creates a plain object from a RS2MS_MsgNotice message. Also converts values to other types if specified.
         * @param message RS2MS_MsgNotice
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.RS2MS_MsgNotice, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RS2MS_MsgNotice to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MS2GW_MsgNotice. */
    interface IMS2GW_MsgNotice {

        /** MS2GW_MsgNotice notice */
        notice?: (msg.IGW2C_MsgNotice|null);
    }

    /** Represents a MS2GW_MsgNotice. */
    class MS2GW_MsgNotice implements IMS2GW_MsgNotice {

        /**
         * Constructs a new MS2GW_MsgNotice.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IMS2GW_MsgNotice);

        /** MS2GW_MsgNotice notice. */
        public notice?: (msg.IGW2C_MsgNotice|null);

        /**
         * Creates a new MS2GW_MsgNotice instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MS2GW_MsgNotice instance
         */
        public static create(properties?: msg.IMS2GW_MsgNotice): msg.MS2GW_MsgNotice;

        /**
         * Encodes the specified MS2GW_MsgNotice message. Does not implicitly {@link msg.MS2GW_MsgNotice.verify|verify} messages.
         * @param message MS2GW_MsgNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IMS2GW_MsgNotice, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified MS2GW_MsgNotice message, length delimited. Does not implicitly {@link msg.MS2GW_MsgNotice.verify|verify} messages.
         * @param message MS2GW_MsgNotice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IMS2GW_MsgNotice, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a MS2GW_MsgNotice message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MS2GW_MsgNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.MS2GW_MsgNotice;

        /**
         * Decodes a MS2GW_MsgNotice message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MS2GW_MsgNotice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.MS2GW_MsgNotice;

        /**
         * Verifies a MS2GW_MsgNotice message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MS2GW_MsgNotice message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MS2GW_MsgNotice
         */
        public static fromObject(object: { [k: string]: any }): msg.MS2GW_MsgNotice;

        /**
         * Creates a plain object from a MS2GW_MsgNotice message. Also converts values to other types if specified.
         * @param message MS2GW_MsgNotice
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.MS2GW_MsgNotice, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MS2GW_MsgNotice to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_AddDeliveryAddress. */
    interface IC2GW_AddDeliveryAddress {

        /** C2GW_AddDeliveryAddress info */
        info?: (msg.IUserAddress|null);
    }

    /** Represents a C2GW_AddDeliveryAddress. */
    class C2GW_AddDeliveryAddress implements IC2GW_AddDeliveryAddress {

        /**
         * Constructs a new C2GW_AddDeliveryAddress.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_AddDeliveryAddress);

        /** C2GW_AddDeliveryAddress info. */
        public info?: (msg.IUserAddress|null);

        /**
         * Creates a new C2GW_AddDeliveryAddress instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_AddDeliveryAddress instance
         */
        public static create(properties?: msg.IC2GW_AddDeliveryAddress): msg.C2GW_AddDeliveryAddress;

        /**
         * Encodes the specified C2GW_AddDeliveryAddress message. Does not implicitly {@link msg.C2GW_AddDeliveryAddress.verify|verify} messages.
         * @param message C2GW_AddDeliveryAddress message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_AddDeliveryAddress, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_AddDeliveryAddress message, length delimited. Does not implicitly {@link msg.C2GW_AddDeliveryAddress.verify|verify} messages.
         * @param message C2GW_AddDeliveryAddress message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_AddDeliveryAddress, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_AddDeliveryAddress message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_AddDeliveryAddress
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_AddDeliveryAddress;

        /**
         * Decodes a C2GW_AddDeliveryAddress message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_AddDeliveryAddress
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_AddDeliveryAddress;

        /**
         * Verifies a C2GW_AddDeliveryAddress message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_AddDeliveryAddress message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_AddDeliveryAddress
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_AddDeliveryAddress;

        /**
         * Creates a plain object from a C2GW_AddDeliveryAddress message. Also converts values to other types if specified.
         * @param message C2GW_AddDeliveryAddress
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_AddDeliveryAddress, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_AddDeliveryAddress to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_DelDeliveryAddress. */
    interface IC2GW_DelDeliveryAddress {

        /** C2GW_DelDeliveryAddress index */
        index?: (number|null);
    }

    /** Represents a C2GW_DelDeliveryAddress. */
    class C2GW_DelDeliveryAddress implements IC2GW_DelDeliveryAddress {

        /**
         * Constructs a new C2GW_DelDeliveryAddress.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_DelDeliveryAddress);

        /** C2GW_DelDeliveryAddress index. */
        public index: number;

        /**
         * Creates a new C2GW_DelDeliveryAddress instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_DelDeliveryAddress instance
         */
        public static create(properties?: msg.IC2GW_DelDeliveryAddress): msg.C2GW_DelDeliveryAddress;

        /**
         * Encodes the specified C2GW_DelDeliveryAddress message. Does not implicitly {@link msg.C2GW_DelDeliveryAddress.verify|verify} messages.
         * @param message C2GW_DelDeliveryAddress message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_DelDeliveryAddress, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_DelDeliveryAddress message, length delimited. Does not implicitly {@link msg.C2GW_DelDeliveryAddress.verify|verify} messages.
         * @param message C2GW_DelDeliveryAddress message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_DelDeliveryAddress, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_DelDeliveryAddress message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_DelDeliveryAddress
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_DelDeliveryAddress;

        /**
         * Decodes a C2GW_DelDeliveryAddress message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_DelDeliveryAddress
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_DelDeliveryAddress;

        /**
         * Verifies a C2GW_DelDeliveryAddress message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_DelDeliveryAddress message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_DelDeliveryAddress
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_DelDeliveryAddress;

        /**
         * Creates a plain object from a C2GW_DelDeliveryAddress message. Also converts values to other types if specified.
         * @param message C2GW_DelDeliveryAddress
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_DelDeliveryAddress, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_DelDeliveryAddress to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_ChangeDeliveryAddress. */
    interface IC2GW_ChangeDeliveryAddress {

        /** C2GW_ChangeDeliveryAddress index */
        index?: (number|null);

        /** C2GW_ChangeDeliveryAddress info */
        info?: (msg.IUserAddress|null);
    }

    /** Represents a C2GW_ChangeDeliveryAddress. */
    class C2GW_ChangeDeliveryAddress implements IC2GW_ChangeDeliveryAddress {

        /**
         * Constructs a new C2GW_ChangeDeliveryAddress.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_ChangeDeliveryAddress);

        /** C2GW_ChangeDeliveryAddress index. */
        public index: number;

        /** C2GW_ChangeDeliveryAddress info. */
        public info?: (msg.IUserAddress|null);

        /**
         * Creates a new C2GW_ChangeDeliveryAddress instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_ChangeDeliveryAddress instance
         */
        public static create(properties?: msg.IC2GW_ChangeDeliveryAddress): msg.C2GW_ChangeDeliveryAddress;

        /**
         * Encodes the specified C2GW_ChangeDeliveryAddress message. Does not implicitly {@link msg.C2GW_ChangeDeliveryAddress.verify|verify} messages.
         * @param message C2GW_ChangeDeliveryAddress message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_ChangeDeliveryAddress, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_ChangeDeliveryAddress message, length delimited. Does not implicitly {@link msg.C2GW_ChangeDeliveryAddress.verify|verify} messages.
         * @param message C2GW_ChangeDeliveryAddress message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_ChangeDeliveryAddress, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_ChangeDeliveryAddress message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_ChangeDeliveryAddress
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_ChangeDeliveryAddress;

        /**
         * Decodes a C2GW_ChangeDeliveryAddress message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_ChangeDeliveryAddress
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_ChangeDeliveryAddress;

        /**
         * Verifies a C2GW_ChangeDeliveryAddress message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_ChangeDeliveryAddress message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_ChangeDeliveryAddress
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_ChangeDeliveryAddress;

        /**
         * Creates a plain object from a C2GW_ChangeDeliveryAddress message. Also converts values to other types if specified.
         * @param message C2GW_ChangeDeliveryAddress
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_ChangeDeliveryAddress, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_ChangeDeliveryAddress to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_SendDeliveryAddressList. */
    interface IGW2C_SendDeliveryAddressList {

        /** GW2C_SendDeliveryAddressList list */
        list?: (msg.IUserAddress[]|null);
    }

    /** Represents a GW2C_SendDeliveryAddressList. */
    class GW2C_SendDeliveryAddressList implements IGW2C_SendDeliveryAddressList {

        /**
         * Constructs a new GW2C_SendDeliveryAddressList.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_SendDeliveryAddressList);

        /** GW2C_SendDeliveryAddressList list. */
        public list: msg.IUserAddress[];

        /**
         * Creates a new GW2C_SendDeliveryAddressList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_SendDeliveryAddressList instance
         */
        public static create(properties?: msg.IGW2C_SendDeliveryAddressList): msg.GW2C_SendDeliveryAddressList;

        /**
         * Encodes the specified GW2C_SendDeliveryAddressList message. Does not implicitly {@link msg.GW2C_SendDeliveryAddressList.verify|verify} messages.
         * @param message GW2C_SendDeliveryAddressList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_SendDeliveryAddressList, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_SendDeliveryAddressList message, length delimited. Does not implicitly {@link msg.GW2C_SendDeliveryAddressList.verify|verify} messages.
         * @param message GW2C_SendDeliveryAddressList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_SendDeliveryAddressList, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_SendDeliveryAddressList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_SendDeliveryAddressList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_SendDeliveryAddressList;

        /**
         * Decodes a GW2C_SendDeliveryAddressList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_SendDeliveryAddressList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_SendDeliveryAddressList;

        /**
         * Verifies a GW2C_SendDeliveryAddressList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_SendDeliveryAddressList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_SendDeliveryAddressList
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_SendDeliveryAddressList;

        /**
         * Creates a plain object from a GW2C_SendDeliveryAddressList message. Also converts values to other types if specified.
         * @param message GW2C_SendDeliveryAddressList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_SendDeliveryAddressList, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_SendDeliveryAddressList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2GW_ReqRechargeMoney. */
    interface IC2GW_ReqRechargeMoney {

        /** C2GW_ReqRechargeMoney amount */
        amount?: (number|null);

        /** C2GW_ReqRechargeMoney token */
        token?: (string|null);

        /** C2GW_ReqRechargeMoney type */
        type?: (number|null);
    }

    /** Represents a C2GW_ReqRechargeMoney. */
    class C2GW_ReqRechargeMoney implements IC2GW_ReqRechargeMoney {

        /**
         * Constructs a new C2GW_ReqRechargeMoney.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IC2GW_ReqRechargeMoney);

        /** C2GW_ReqRechargeMoney amount. */
        public amount: number;

        /** C2GW_ReqRechargeMoney token. */
        public token: string;

        /** C2GW_ReqRechargeMoney type. */
        public type: number;

        /**
         * Creates a new C2GW_ReqRechargeMoney instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2GW_ReqRechargeMoney instance
         */
        public static create(properties?: msg.IC2GW_ReqRechargeMoney): msg.C2GW_ReqRechargeMoney;

        /**
         * Encodes the specified C2GW_ReqRechargeMoney message. Does not implicitly {@link msg.C2GW_ReqRechargeMoney.verify|verify} messages.
         * @param message C2GW_ReqRechargeMoney message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IC2GW_ReqRechargeMoney, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified C2GW_ReqRechargeMoney message, length delimited. Does not implicitly {@link msg.C2GW_ReqRechargeMoney.verify|verify} messages.
         * @param message C2GW_ReqRechargeMoney message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IC2GW_ReqRechargeMoney, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a C2GW_ReqRechargeMoney message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2GW_ReqRechargeMoney
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.C2GW_ReqRechargeMoney;

        /**
         * Decodes a C2GW_ReqRechargeMoney message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2GW_ReqRechargeMoney
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.C2GW_ReqRechargeMoney;

        /**
         * Verifies a C2GW_ReqRechargeMoney message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2GW_ReqRechargeMoney message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2GW_ReqRechargeMoney
         */
        public static fromObject(object: { [k: string]: any }): msg.C2GW_ReqRechargeMoney;

        /**
         * Creates a plain object from a C2GW_ReqRechargeMoney message. Also converts values to other types if specified.
         * @param message C2GW_ReqRechargeMoney
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.C2GW_ReqRechargeMoney, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2GW_ReqRechargeMoney to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GW2C_RetRechargeMoney. */
    interface IGW2C_RetRechargeMoney {

        /** GW2C_RetRechargeMoney urlcheckout */
        urlcheckout?: (string|null);
    }

    /** Represents a GW2C_RetRechargeMoney. */
    class GW2C_RetRechargeMoney implements IGW2C_RetRechargeMoney {

        /**
         * Constructs a new GW2C_RetRechargeMoney.
         * @param [properties] Properties to set
         */
        constructor(properties?: msg.IGW2C_RetRechargeMoney);

        /** GW2C_RetRechargeMoney urlcheckout. */
        public urlcheckout: string;

        /**
         * Creates a new GW2C_RetRechargeMoney instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GW2C_RetRechargeMoney instance
         */
        public static create(properties?: msg.IGW2C_RetRechargeMoney): msg.GW2C_RetRechargeMoney;

        /**
         * Encodes the specified GW2C_RetRechargeMoney message. Does not implicitly {@link msg.GW2C_RetRechargeMoney.verify|verify} messages.
         * @param message GW2C_RetRechargeMoney message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: msg.IGW2C_RetRechargeMoney, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Encodes the specified GW2C_RetRechargeMoney message, length delimited. Does not implicitly {@link msg.GW2C_RetRechargeMoney.verify|verify} messages.
         * @param message GW2C_RetRechargeMoney message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: msg.IGW2C_RetRechargeMoney, writer?: protobuf.Writer): protobuf.Writer;

        /**
         * Decodes a GW2C_RetRechargeMoney message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GW2C_RetRechargeMoney
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: (protobuf.Reader|Uint8Array), length?: number): msg.GW2C_RetRechargeMoney;

        /**
         * Decodes a GW2C_RetRechargeMoney message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GW2C_RetRechargeMoney
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: (protobuf.Reader|Uint8Array)): msg.GW2C_RetRechargeMoney;

        /**
         * Verifies a GW2C_RetRechargeMoney message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GW2C_RetRechargeMoney message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GW2C_RetRechargeMoney
         */
        public static fromObject(object: { [k: string]: any }): msg.GW2C_RetRechargeMoney;

        /**
         * Creates a plain object from a GW2C_RetRechargeMoney message. Also converts values to other types if specified.
         * @param message GW2C_RetRechargeMoney
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: msg.GW2C_RetRechargeMoney, options?: protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GW2C_RetRechargeMoney to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
