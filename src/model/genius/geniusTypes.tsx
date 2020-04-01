export type GeniusSearch = {
    hits: [
        {
            highlights: any,
            index: string,
            type: string,
            result: GeniusArtist | GeniusSong | GeniusAlbum
        }
    ]
}

export type GeniusMedia = {
    native_uri?: string,
    provider: string,
    type: string,
    url: string
}

export type GeniusArtist = {
    api_path: string,
    header_image_url: string,
    id: number,
    image_url: string,
    is_meme_verified: Boolean,
    is_verified: Boolean,
    name: string,
    url: string,
    iq: number
}

type GeniusAlbum = {
    api_path: string,
    cover_art_url: string,
    full_title: string,
    id: number,
    name: string,
    url: string,
    artist: GeniusArtist
}

export type GeniusSong = {
    annotation_count: number,
    api_path: string,
    apple_music_id: string,
    apple_music_player_url: string,
    description: any,
    embed_content: string,
    featured_video: Boolean,
    full_title: string,
    header_image_thumbnail_url: string,
    header_image_url: string,
    id: number,
    lyrics_owner_id: number,
    lyrics_state: string,
    path: string,
    pyongs_count: number,
    recording_location: string,
    release_date: string,
    release_date_for_display: string,
    song_art_image_thumbnail_url: string,
    song_art_image_url: string,
    stats: {
        accepted_annotations: number,
        contributors: number,
        iq_earners: number,
        transcribers: number,
        unreviewed_annotations: number,
        verified_annotations: number,
        hot: Boolean,
        pageviews: number
    },
    title: string,
    title_with_featured: string,
    url: string,
    current_user_metadata: any,
    album: GeniusAlbum,
    custom_performances: any,
    description_annotation: any,
    featured_artists: any,
    lyrics_marked_complete_by: string,
    media: GeniusMedia,
    primary_artist: GeniusArtist,
    producer_artists: GeniusArtist[],
    song_relationships: any,
    verified_annotations_by: any,
    verified_contributors: any
    verified_lyrics_by: any,
    writer_artists: GeniusArtist[],
    lyrics?: string
}
