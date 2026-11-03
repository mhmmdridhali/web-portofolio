export interface PlaylistTrack {
  title: string;
  artist: string;
  cover: string;
  src: string;
  spotifyUrl?: string;
}

export interface CuratedPlaylist {
  key: "seoul" | "ranum";
  id: string;
  name: string;
  description: string;
  spotifyUrl: string;
  playlistCover: string;
  tracks: PlaylistTrack[];
}

export const CURATED_PLAYLISTS: CuratedPlaylist[] = [
  {
    "key": "seoul",
    "id": "5P0hFUrtO9EBFAyrbmkGLV",
    "name": "Somewhere in Seoul",
    "description": "A collection of melodies, quiet feelings, and memories somewhere in Seoul.",
    "spotifyUrl": "https://open.spotify.com/playlist/5P0hFUrtO9EBFAyrbmkGLV?si=c876ec5c34ca43a4",
    "playlistCover": "https://mosaic.scdn.co/640/ab67616d00001e027833c4c10979d7c3cfb67f09ab67616d00001e02a66e0e273f304294df029d17ab67616d00001e02d41cdd1f3e033a0ea1642112ab67616d00001e02e01d70b9b2173b44b863099f",
    "tracks": [
      {
        "title": "You’re Precious",
        "artist": "Standing Egg",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d5/b4/1b/d5b41b03-9934-2e4f-cfa9-22d51295f448/8809960982287.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/28bb699fec0aee61c9d5759f3b999c44bbe57a68",
        "spotifyUrl": "https://open.spotify.com/track/0grAbqXDOJDerhzeYB4wy3"
      },
      {
        "title": "Ordinary Confession",
        "artist": "LEE MU JIN",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/73/fe/ac/73feac6d-cd61-6a40-dbaa-efb7a6b22ab8/8804775330483_cover.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/de2ba8bff1dbc23d7ef59301fc89d7e377093812",
        "spotifyUrl": "https://open.spotify.com/track/6JIm38KbaDGfi65VGETDi9"
      },
      {
        "title": "How can I love the heartbreak, you're the one I love",
        "artist": "AKMU",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/e4/a2/80/e4a28015-490b-255a-ff26-aadd6257cfa1/AKMU_DS.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/c204b7f258d067806c4c432ddfe452b37fec7f73",
        "spotifyUrl": "https://open.spotify.com/track/0hqj5JBnFt1BHEz2UCFwrl"
      },
      {
        "title": "Hollow Wood",
        "artist": "paulkyte",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/9a/7a/de/9a7adec2-4d25-9b32-d295-6dc2c6d8c652/8809717511159.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/f3f0142abdbd6e16a9f62b28ab94c2197d0392b8",
        "spotifyUrl": "https://open.spotify.com/track/1vJ9O7pcabPA2q6kze1pAH"
      },
      {
        "title": "Still With You",
        "artist": "Jung Kook",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/61/69/33/616933f6-6d23-321e-f928-1f1c969f130e/195081749037_Cover.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/af2a740e10a6956dedd7e7f66fd65d7166e9187f",
        "spotifyUrl": "https://open.spotify.com/track/0eFMbKCRw8KByXyWBw8WO7"
      },
      {
        "title": "Star",
        "artist": "Colde",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/10/5c/16/105c1679-d1c7-8b4f-333b-de969c0b239e/888272119152_Cover.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/592e11f89ae9c6cc316c3376b0b19ec27d646dab",
        "spotifyUrl": "https://open.spotify.com/track/73Zoq6Z5lXVJPAERw2s9fp"
      },
      {
        "title": "ONLY",
        "artist": "LEEHI",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/d9/5a/a9/d95aa943-0e9b-ae75-3157-ab372f5b831a/8809704422604_Cover.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/eafce5ab37f349c128230b4d371801b875b5c26b",
        "spotifyUrl": "https://open.spotify.com/track/6TBJkXHPhu3EsMk1bshwuI"
      },
      {
        "title": "Can You See My Heart",
        "artist": "Heize",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/35/4a/6c/354a6cdd-a913-62f3-4907-28a5d9aaf787/84561be4-a701-4384-96d9-2915d8563ebd.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/2f601b3f67502d541cc010505be0e640da51377c",
        "spotifyUrl": "https://open.spotify.com/track/6td501MwDVFewdz6qNOtG8"
      },
      {
        "title": "Forgetting You",
        "artist": "DAVICHI",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/f6/96/e1/f696e1c6-bf77-6b5f-0753-4e59980d89ba/8809484118117_Cover.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/618af48f736cf1a0e7c1d9d46c2e61d5af53c576",
        "spotifyUrl": "https://open.spotify.com/track/59OFG0mm09ve4i3RcbmdwB"
      },
      {
        "title": "Please Don't Cry",
        "artist": "DAVICHI",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/3a/a2/6c/3aa26c36-d5eb-3853-df1d-ed10d21c8fac/198009158911.png/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/f7940e24e9b1ab8ae402e67396318630b3f36a54",
        "spotifyUrl": "https://open.spotify.com/track/5pmhDbaeNG5Y31mCGK07JE"
      },
      {
        "title": "Midnight",
        "artist": "Heize, Punch",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/d1/9a/30/d19a3023-6888-863a-e1f1-611ecc604ad4/cover_KM0011257_1.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/0efc7b32f95da90ebcc02baf517e295305980ae9",
        "spotifyUrl": "https://open.spotify.com/track/2j7pfH8zJkfNzCfoOBTKkX"
      },
      {
        "title": "To My Youth",
        "artist": "BOL4",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/56/bf/9c/56bf9cc9-5303-7331-970e-5b5e0e6da98e/8804775084331.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/9222c41e44bab6e994a45586841ad36e15eadba7",
        "spotifyUrl": "https://open.spotify.com/track/4gMPlHHAjOQnUrhsuqHivn"
      },
      {
        "title": "This Love",
        "artist": "DAVICHI",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e9/9e/9a/e99e9af5-780f-81bc-48a5-ea2f30bec2b2/8809492017990.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/b50f116364f39f6b152bbd947b9be9c6a5c174e5",
        "spotifyUrl": "https://open.spotify.com/track/1mh5s6XJ3RLJBRPErACsHW"
      },
      {
        "title": "Episode",
        "artist": "LEE MU JIN",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/e4/9b/d3/e49bd30b-fbfb-71b1-d0aa-872aa6a0a278/8804775309342_cover.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/99f6449e700c5a2f8128176580ec463a3dd666ca",
        "spotifyUrl": "https://open.spotify.com/track/3ImDzyDVlxu6qjxT49vlX0"
      },
      {
        "title": "Love, Maybe (Acoustic Ver.)",
        "artist": "KIM SE JEONG",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/b9/47/76/b9477698-e0ea-d346-aa4a-ebda46e402e6/cover_KM0015044_1.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/d27c964a1f4b1fefc4628e579931b8ffbc2f1df6",
        "spotifyUrl": "https://open.spotify.com/track/3V2fMXzPJLkIQyRgwOLgip"
      },
      {
        "title": "Rain and You",
        "artist": "LEE MU JIN",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/d4/cc/ea/d4ccea77-1a22-77b1-df17-1a6796fcb1a0/888272082081_Cover.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/fa8f91c3e0d95547c624f66c431f95af3657bea6",
        "spotifyUrl": "https://open.spotify.com/track/4ribiWWnI451QMRdOgByIP"
      },
      {
        "title": "With",
        "artist": "Kim Taeri, Nam Joohyuk, Bona(WJSN), Choi Hyunwook, Lee Joomyung",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/87/04/b1/8704b168-4724-2fb8-7d5a-a11d621c7903/OST_Pt7.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/25f965605e590c983b175925db5f47fb27d78a46",
        "spotifyUrl": "https://open.spotify.com/track/73ZHqY7Ma03NpKiKs26yQU"
      },
      {
        "title": "With My Tears - Drama Version",
        "artist": "Mido and Falasol",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/57/6d/f1/576df11e-47ee-94ef-a4ec-1acb037cedcb/888272081473_Cover.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/34f263731447bbdc44058495d152b3b8d09b615a",
        "spotifyUrl": "https://open.spotify.com/track/7JQeu7AyFO2Pt8tsNdSUFW"
      },
      {
        "title": "I Will Go To You Like the First Snow",
        "artist": "AILEE",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/3f/3d/d0/3f3dd00d-4bd1-8e71-1300-9387c7a319d3/8809534461859_Cover.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/9a1f270aab286384e1533f12320cc553d873b54c",
        "spotifyUrl": "https://open.spotify.com/track/2BPXILn0MqOe5WroVXlvN1"
      },
      {
        "title": "Sudden Shower",
        "artist": "ECLIPSE",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/41/84/09/418409b3-7485-6cc0-9533-584fb0eecfaf/888272132571_Cover.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/1218498ba0ac907d25227d87cb0012c72eda1eb6",
        "spotifyUrl": "https://open.spotify.com/track/1OhIn0L6iofnk5bjalWfHq"
      },
      {
        "title": "If It Is You",
        "artist": "Jung Seung Hwan",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/66/4a/11/664a11b9-a062-8685-0787-17dae2bdb03d/8809484115420_Cover.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/08bce738f91707117193ead9c31e846519955ea7",
        "spotifyUrl": "https://open.spotify.com/track/5i6gHFXg4aLK5xvc2jJJC5"
      },
      {
        "title": "Still With You",
        "artist": "Reza Darmawangsa",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/15/7d/15/157d1537-73c0-8fde-0a98-7e2b41580e3b/519280.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/dc838829e8c79904418b255128a96ed48edd00f9",
        "spotifyUrl": "https://open.spotify.com/track/0KiBHuri8WVYk0L19YDAZr"
      },
      {
        "title": "살다가",
        "artist": "SG Wannabe",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/a7/6a/3f/a76a3f35-d989-c478-7cc9-b04749d8684b/dj.csxrijam.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/4cb55ab9f15e36c83460e3dc36e9992fad2c4e93",
        "spotifyUrl": "https://open.spotify.com/track/0qqHi5iyYkcbvCpnWwHKLl"
      },
      {
        "title": "Still love you",
        "artist": "Yoo Hwe Seung",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/b2/f5/f5/b2f5f582-ff4e-c486-8c48-4cabcbbb88f4/8809961045271.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/2fec52088c8d2c5e43765b6b4240c4daedb1ec4c",
        "spotifyUrl": "https://open.spotify.com/track/5esoMEIfH9LEOYliDi1Q8r"
      },
      {
        "title": "Spring Snow",
        "artist": "10CM",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/13/e6/e8/13e6e889-c2a5-95f0-2936-5c3994fb306e/888272134100_Cover.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/9144a0ba9a5d7a2050ae21c0090060b264b54ab7",
        "spotifyUrl": "https://open.spotify.com/track/0tCr7DoUBSdtdSl0rxZmct"
      },
      {
        "title": "Coming Of Age Story",
        "artist": "LEE MU JIN",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/ac/d1/46/acd14621-b7e3-42fe-29e9-8f7a80f700c7/8804775389948_cover.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/8276faabc7c196eb21f74b9720bb7f6a6e41cba2",
        "spotifyUrl": "https://open.spotify.com/track/2ZTU8atPwouhoQSvxv9aQj"
      },
      {
        "title": "seasons",
        "artist": "wave to earth",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/fa/c5/61/fac561dc-8db4-b2e9-d3db-6e246da72bfa/5054197890017.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/6300acd85a89974a70726348cf0e5296d001a650",
        "spotifyUrl": "https://open.spotify.com/track/5VBjyOQzqlPNgdRPMM6prF"
      },
      {
        "title": "love.",
        "artist": "wave to earth",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/71/b6/82/71b6820b-97a2-9968-c5a8-b659103030b1/5054197659843.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/5af5afdcef449c1c6d64f858b1f4e0d798727b58",
        "spotifyUrl": "https://open.spotify.com/track/5mtTAScDytxMMqZj14NmlN"
      },
      {
        "title": "blue",
        "artist": "yung kai",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/33/62/62/33626226-0cf3-ff64-3296-b2355de71fac/0748777703419.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/4f9ec59f25eb7b2dbe9fc052d23957116a4d5ba5",
        "spotifyUrl": "https://open.spotify.com/track/3be9ACTxtcL6Zm4vJRUiPG"
      },
      {
        "title": "Sunset",
        "artist": "DAVICHI",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/8e/9d/67/8e9d67df-ec0b-a4e0-23b9-496918941f9c/8809704412261_Cover.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/2dc8baa98ab882a0f553fa62aa7b1d2ad25499e6",
        "spotifyUrl": "https://open.spotify.com/track/4pGYUkxccL8wtRaOrbuJ5j"
      },
      {
        "title": "All of My Days",
        "artist": "KIM SE JEONG",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/1c/65/00/1c650023-edab-3c71-f3c0-44de0851cc0d/8809704412179_Cover.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/639b2337930cc90f7f1fc919737b5ade757d551a",
        "spotifyUrl": "https://open.spotify.com/track/2RBuzNyLuV1jXU8qi84Hiy"
      },
      {
        "title": "Early Spring",
        "artist": "Choi Yu Ree",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/5b/37/ba/5b37ba2b-3ac4-4104-c939-647e27dd4c54/cover_KM0024209_1.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/6f4da30d2c72f7fc6e1e2e2abda2d227d0936dc1",
        "spotifyUrl": "https://open.spotify.com/track/2GQ19vTX8j08Z6MN240E9n"
      },
      {
        "title": "Two Of Us",
        "artist": "Woody",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/4a/5d/9a/4a5d9a17-90ae-5699-e1df-cc15d0269009/cover_KM0024465_1.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/650d8d60d97526a29def8153c253b7fde05416db",
        "spotifyUrl": "https://open.spotify.com/track/6K8r6pX0pFKA2g5t2FORxJ"
      },
      {
        "title": "Miss you",
        "artist": "KIM BUMSOO",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/ff/cb/5f/ffcb5f30-507d-07e4-f544-f7ae859fe281/cover_KM0016571_1.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/69c04fd137f90b3b7b255e9337c46532d0032960",
        "spotifyUrl": "https://open.spotify.com/track/3QQ8y7ufbvrksiMtYZywo1"
      }
    ]
  },
  {
    "key": "ranum",
    "id": "4P8tIjKHTrj9lxTIdk4wbA",
    "name": "Ranum",
    "description": "Tentang rasa yang tumbuh perlahan, pikiran yang mengembara, dan waktu yang berjalan lebih tenang.",
    "spotifyUrl": "https://open.spotify.com/playlist/4P8tIjKHTrj9lxTIdk4wbA?si=343cbecf979744e7",
    "playlistCover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
    "tracks": [
      {
        "title": "The Way You Do",
        "artist": "Crying City",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/21/33/0d/21330dea-1584-5275-bb6b-7ded589da45d/artwork.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/7c0cbcbe96fe55e465a4251e47a0b8c2f152ae53",
        "spotifyUrl": "https://open.spotify.com/track/4iP3ooqTWbsrpn5mnTB3XI"
      },
      {
        "title": "Drunk Text - Slowed & Reverb",
        "artist": "Rainsomn",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/21c7c7ce850b10098a4a2d51350b6974b185d824",
        "spotifyUrl": "https://open.spotify.com/track/13nIsZjKaLk1PmyZ9P7rY5"
      },
      {
        "title": "Somewhere Only We Know",
        "artist": "rhianne",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/f7/87/94/f7879408-794c-3e11-26a7-ac0a56581722/7312.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/de3a83df3ed6cd4b9890eeee2e3eeaec308405ff",
        "spotifyUrl": "https://open.spotify.com/track/50Q02S1ZY0hwbmHTMABuDC"
      },
      {
        "title": "Hurts So Good - Slow + Reverb",
        "artist": "Astrid S",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/7a/9b/33/7a9b3385-0cf2-ed7d-3226-0b396dfbe95d/21UMGIM22076.rgb.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/3247403036cf0645713cee918a6f5d68d69a63f4",
        "spotifyUrl": "https://open.spotify.com/track/4CWP7Zw5iq6Pwy69xlhpvl"
      },
      {
        "title": "Dandelions - slowed + reverb",
        "artist": "Ruth B., sped up + slowed, slater",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/24/f7/82/24f782af-5aea-55e7-bf67-2f4e62664fe8/886446439341.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/abffc43ba21f13b8a2c18473b7ace2d664c52914",
        "spotifyUrl": "https://open.spotify.com/track/6fhG2KJgwO7CrNflRaRmvp"
      },
      {
        "title": "Fallen Kingdom",
        "artist": "Gustixa",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/d2c04511abe8c56f0ee543a192a8b72c65394660",
        "spotifyUrl": "https://open.spotify.com/track/4Wz7kkG8DRVl56cqJHj92l"
      },
      {
        "title": "favorite lesson",
        "artist": "yaeow",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/4f/4b/99/4f4b9987-f707-7816-e26b-f85ab1c63713/142898.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/f82785d5f16f7098cf2ba7efc4c1b015fd2eb266",
        "spotifyUrl": "https://open.spotify.com/track/4sclvawl5PVjt5oXRcPbF2"
      },
      {
        "title": "heather - rain (slowed)",
        "artist": "ijustwanttodie",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/d8/1d/55/d81d5560-87de-88fc-7080-3b1567de697a/196922882647_Cover.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/bf4352a46603cd251e74fb7871674973b3649370",
        "spotifyUrl": "https://open.spotify.com/track/2v8btiJvOzIZ3VDEV5gwhu"
      },
      {
        "title": "Late Night Thoughts",
        "artist": "Belfa, Kayli Marie",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/b1a41a1312dc7150681e9605e5af6384551e8c78",
        "spotifyUrl": "https://open.spotify.com/track/3Mdm8dwQRAr9AbgULsi1uB"
      },
      {
        "title": "Stargazing",
        "artist": "Isabella Celander",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/44/e5/d0/44e5d0fa-600f-1ca0-cf1c-76cf607be764/7330065075303.png/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/26a835e4412028f69035bbb7180f89ba8c66f1ac",
        "spotifyUrl": "https://open.spotify.com/track/4sAX65hbNtEC1lceCdGuMt"
      },
      {
        "title": "talking to the moon - slowed + reverb",
        "artist": "twilight, slō, Tazzy",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/a6/76/6f/a6766fb7-7c9e-34cf-27c3-3541cf9eec04/196400989967_slowmgkirby.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/9b92dc02cbe6d03c8e225bffa2547a606168a638",
        "spotifyUrl": "https://open.spotify.com/track/7k0VR8pFztHEVkg54V4UMJ"
      },
      {
        "title": "i'm in love with u",
        "artist": "Gustixa",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/3e/63/93/3e6393fb-5fe2-1ef4-1c0d-6452919a351c/828768904824.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/0e3dcfa50d188c124acd8bf9b9255c10c154741b",
        "spotifyUrl": "https://open.spotify.com/track/5sYZiEtBFGntBjEaEkZTD6"
      },
      {
        "title": "Melancholy",
        "artist": "Gustixa",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/b8039f7b7f98b102ccfc3739c7a1bd7b59e8d053",
        "spotifyUrl": "https://open.spotify.com/track/5HRQ8J99mJaQgixklkh5AG"
      },
      {
        "title": "Dancing With Your Ghost - Slowed",
        "artist": "Pop Mage, Honeyfox",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/fe/46/ba/fe46ba85-d66c-6a08-8142-c14b362c31ac/197773265375_cover.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/31ef91857f0669bf99f14f8fbe297ff7b7172398",
        "spotifyUrl": "https://open.spotify.com/track/3kGEDnn5e2iAFHDDoaGkBX"
      },
      {
        "title": "Night Changes",
        "artist": "Gustixa",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/e1981aef9adc75929aa65a802982c2447b99a0d0",
        "spotifyUrl": "https://open.spotify.com/track/3LWzlrTI2mSWL8qQE3H7qc"
      },
      {
        "title": "Lucky",
        "artist": "Crying City",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/af/a7/38/afa73854-ef67-b496-4286-302a2ffea05b/artwork.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/672b30484a65ecef8df893d214452af42457582e",
        "spotifyUrl": "https://open.spotify.com/track/09Z5YKtm4e5aafPFGUh69O"
      },
      {
        "title": "stay a while",
        "artist": "Crying City",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/f9/22/4a/f9224a05-0dab-8aa2-c791-7ab3b8fddda4/artwork.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/02ee853cce6b1de76d613cae1718f9384d6afa12",
        "spotifyUrl": "https://open.spotify.com/track/7eojaHraalwfpldEWw6wWX"
      },
      {
        "title": "Scott Street",
        "artist": "Phoebe Bridgers",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/39/91/4f/39914f60-e9aa-4ae9-3962-44b0a5e5d570/656605150062.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/bbd8aaaf93fea56b88aa4fedcfc167a661aedef8",
        "spotifyUrl": "https://open.spotify.com/track/6Uwi2Qk3H7fM4b4W4ExrAp"
      },
      {
        "title": "golden hour - slowed + reverb",
        "artist": "slō, twilight, Tazzy",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/8d/1a/7b/8d1a7b44-316f-7c7f-4380-935673fb697a/5056167175650.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/f3fc267297431887078f5e6f9deccffc601f4be0",
        "spotifyUrl": "https://open.spotify.com/track/0L3TCZyJ6Np1ZobO8fSHRM"
      },
      {
        "title": "glimpse of us - slowed + reverb",
        "artist": "slō, twilight, Tazzy",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/798448af155cc195c07eb7cf0e481e3e0472403e",
        "spotifyUrl": "https://open.spotify.com/track/5TFhpCHMvNdCPU3KlRHMUf"
      },
      {
        "title": "Ocean Eyes - Slowed",
        "artist": "Pop Mage, Hannah Gracelynn",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/21/3e/9a/213e9a60-ae68-dbe9-385e-fc06b6d1de47/197999034588_cover.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/982dea99af77f8b59ffc1e4cacfdd856d4451c19",
        "spotifyUrl": "https://open.spotify.com/track/1SlkMLwTQgffbk2OP2nOPn"
      },
      {
        "title": "here with me (i don't care how long it takes as long as i'm with you) - slowed + reverb",
        "artist": "slō, twilight, Tazzy",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/aa/1e/a2/aa1ea275-711d-8578-3643-4fea4ad98192/5063212494130_cover.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/53a5c9dc4b8d37800cac7eca233d13ff8a689ed6",
        "spotifyUrl": "https://open.spotify.com/track/6sae1q7qg2hf7A8PJBBlEv"
      },
      {
        "title": "Teenage Mona Lisa (feat. Aiden Adair) - Gustixa Remix",
        "artist": "Alfie Castley, Gustixa, Aiden Adair",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/47/44/eb/4744eb9a-7acb-356f-fcf8-98f3932e682a/196626479617.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/898c7eda7e746c019b44a6f33fbfb7d0eb30dcd8",
        "spotifyUrl": "https://open.spotify.com/track/0HerB0pCBtGxB45eZQXUis"
      },
      {
        "title": "Margaret (Slowed + Reverb) - When You Know You Know",
        "artist": "3slow2",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/4255c1b818e5f446561ebd2e96de859843abd96a",
        "spotifyUrl": "https://open.spotify.com/track/2Vk9IJWlbpNcSLagl2zn7m"
      },
      {
        "title": "idontwannabeyouanymore",
        "artist": "Billie Eilish",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/d0f7b9fcc09bc955a14726e862a19716ddb8d526",
        "spotifyUrl": "https://open.spotify.com/track/41zXlQxzTi6cGAjpOXyLYH"
      },
      {
        "title": "happier - slowed + reverb",
        "artist": "slō, twilight, Tazzy",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/f6/e5/5f/f6e55fda-1d8c-a93b-364a-9997f1d68323/5063011680697_cover.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/5f92dfa9f85e62b7de87c623a08aaab3f27a0801",
        "spotifyUrl": "https://open.spotify.com/track/1LgXkEUgdrPTLcYMxgqVNz"
      },
      {
        "title": "Please Please Please",
        "artist": "Rainsomn",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/b53dff3796d07d54cec0dd9c0ebcf2fc739100ea",
        "spotifyUrl": "https://open.spotify.com/track/2CMo6Vppqw3Wh8zYHg9sJb"
      },
      {
        "title": "Eenie Meenie",
        "artist": "Rainsomn",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/2bed038aa8a2a5c4d127c15ab6325fedd3b503c9",
        "spotifyUrl": "https://open.spotify.com/track/2xpJPW4o2zsH1A93oYNC6y"
      },
      {
        "title": "we can’t be friends - slowed & reverb",
        "artist": "Rainsomn",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/1123e5cec188dd5058d46a036087bc833219f757",
        "spotifyUrl": "https://open.spotify.com/track/16GLFHV7dYxgsXCwnYcc1H"
      },
      {
        "title": "Always",
        "artist": "Rainsomn",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/74a5a11baf7dce76bc0df6929fe57f42bf35683c",
        "spotifyUrl": "https://open.spotify.com/track/3xmI6c05jCSTcRd7KnBHcz"
      },
      {
        "title": "You're Gonna Live Forever in Me",
        "artist": "Rainsomn",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/ca/2b/47/ca2b479c-bf87-d879-a4b6-27e25876c74b/198009214525.png/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/bb21f4c853f72773d9b8e28d3729e90cd2335614",
        "spotifyUrl": "https://open.spotify.com/track/2wbu5q37MldkuOQPUZEBGO"
      },
      {
        "title": "Love Yourself",
        "artist": "Rainsomn",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/8a46a43f12365589c4dd28f18be398a0f32e3b75",
        "spotifyUrl": "https://open.spotify.com/track/4ErgbfruUUyooRNZpURRYR"
      },
      {
        "title": "My Love Mine All Mine",
        "artist": "Rainsomn",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/9b4f1b68565f4365b56f93dec33dfdb35c4444da",
        "spotifyUrl": "https://open.spotify.com/track/0Mi7oiTvER7EZcKwibZIvO"
      },
      {
        "title": "Hard to Love",
        "artist": "Crying City",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/4d/c7/4d/4dc74df6-146d-f4d0-97ec-c270bf706178/artwork.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/bc52b33d41991f44490e8497330ccaa54013abb7",
        "spotifyUrl": "https://open.spotify.com/track/02IoOzEXqX0Xi4IfuTBX96"
      },
      {
        "title": "Urn",
        "artist": "Crying City",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/784d313be874e35a7129c16d5b48ecf3b3efa5f7",
        "spotifyUrl": "https://open.spotify.com/track/0SsOMCjOCpit4EfFpwjcFW"
      },
      {
        "title": "Close to You",
        "artist": "Rainsomn",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/6f7456f6c511180a8f201535e41a225652f1e4d6",
        "spotifyUrl": "https://open.spotify.com/track/5ybEHBcDBgC4pyL3ErKs7d"
      },
      {
        "title": "Fly Me To The Moon",
        "artist": "Rainsomn",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/3a/37/1a/3a371a7e-33fe-85db-0616-0c57ef26fb42/13UAEIM06265.rgb.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/3991a7b4c800cdb44dd2efc517e89907897c27d5",
        "spotifyUrl": "https://open.spotify.com/track/50ITFHhoeenOOyd7sYxfey"
      },
      {
        "title": "Wish I Was Better",
        "artist": "Kina, yaeow",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/e38be393de6b0fe4f101fdf71c4b3bdaed990ad2",
        "spotifyUrl": "https://open.spotify.com/track/1kAkUHFb7ryeVkVSRD6Nkj"
      },
      {
        "title": "What Was I Made For",
        "artist": "Rainsomn",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/889ecb2100163c887b9babfe8ee63aaca2a68152",
        "spotifyUrl": "https://open.spotify.com/track/020qKmyZvKccA8SlELnznf"
      },
      {
        "title": "Officially Missing You",
        "artist": "Rainsomn",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/a214dec1d9a46d0e631f6b12409d51881f279ae0",
        "spotifyUrl": "https://open.spotify.com/track/5Slj6MxGnycH7kspLfdWbh"
      },
      {
        "title": "dancin - slowed + reverb",
        "artist": "slō, twilight, Tazzy",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/d806913951a718d2f82cb9bf2e927e5c7ee7c407",
        "spotifyUrl": "https://open.spotify.com/track/2ttVXu6xdhYbCSkqpY139i"
      },
      {
        "title": "Duvet - Slowed Down Version",
        "artist": "bôa",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/04fa2f4bfcfcb2b73237d4e2e01bafe49b271b71",
        "spotifyUrl": "https://open.spotify.com/track/6R8MCJtqkqvRNG76Cswy1M"
      },
      {
        "title": "Nothing",
        "artist": "Bruno Major",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/c58d62f7c6495a34f59c6ee670f47bb7e816733b",
        "spotifyUrl": "https://open.spotify.com/track/1lORkxEMmsCZqhoxcmk3A3"
      },
      {
        "title": "if u could see me cryin' in my room",
        "artist": "Arash Buana, raissa anggiani",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/b888b8b118ea315813f6cafd0b6960cca9ac5b0d",
        "spotifyUrl": "https://open.spotify.com/track/13sOb9V6Y3uCnRxY9HIZqP"
      },
      {
        "title": "I Think They Call This Love",
        "artist": "Rainsomn",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/2926e92a058edc411bd21a8490eb6957f710715d",
        "spotifyUrl": "https://open.spotify.com/track/2JNY5GBZxNKN5qVkuaVTkc"
      },
      {
        "title": "Lily of The Valley",
        "artist": "DANIEL",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/5674f011eb995f50d6a121daa9d3840b6ab16187",
        "spotifyUrl": "https://open.spotify.com/track/4gAIUEY7VkeiKQOPwIYaYb"
      },
      {
        "title": "Die With A Smile",
        "artist": "Rainsomn",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/32e6ff840617abe97e2292128aabbc5eb67e7cba",
        "spotifyUrl": "https://open.spotify.com/track/2jyjLp1QxtqNEDegrmV85f"
      },
      {
        "title": "rewrite the stars - slowed + reverb",
        "artist": "slō, twilight",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/c6048d70b269932bf92edc1cb1a12d92d9e58ddc",
        "spotifyUrl": "https://open.spotify.com/track/4k5NSGl10fsdFmXvNWHkCs"
      },
      {
        "title": "Alonica",
        "artist": "Rainsomn",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/babc9caf8ebdae39a709a3c27c906a38af8512c2",
        "spotifyUrl": "https://open.spotify.com/track/2o2SIGIUjeCpLi8CyUs064"
      },
      {
        "title": "mirrors - slowed + reverb",
        "artist": "slō, twilight",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/b2e7f4600b0fe4ee1a80d8b2e6a4c2ab27d33539",
        "spotifyUrl": "https://open.spotify.com/track/0bBfI6WUbumHDgKSnIcf1x"
      },
      {
        "title": "When She Loved Me",
        "artist": "Lyn Lapid",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/19ce81a5205dbf9c9a47e552b105d867692b7d55",
        "spotifyUrl": "https://open.spotify.com/track/3198LMj0bpnXj8Mb1GLo3u"
      },
      {
        "title": "Mangu - Slowed & Reverb",
        "artist": "Rainsomn",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/8f035ca4b515fa90bef8f3c5397b21aa0cfe3619",
        "spotifyUrl": "https://open.spotify.com/track/5d1Fpm5iRmirkjh8uTk4O2"
      },
      {
        "title": "Terakhir Kali",
        "artist": "Rainsomn",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/fa82b2a5e14010a101d07d597797de54b80a2075",
        "spotifyUrl": "https://open.spotify.com/track/1vllBVCDy34Qi6D3lh8Icn"
      },
      {
        "title": "Lesung Pipi",
        "artist": "Rainsomn",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/81bd86f451036ee4358dcf20ff159a9f1aa740fd",
        "spotifyUrl": "https://open.spotify.com/track/1FrrRt9I0Ci7KI6zXL6Vjb"
      },
      {
        "title": "WILDFLOWER",
        "artist": "Billie Eilish",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/92/9f/69/929f69f1-9977-3a44-d674-11f70c852d1b/24UMGIM36186.rgb.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/ab7acea907be9cbe03bba9964765aa889f53d238",
        "spotifyUrl": "https://open.spotify.com/track/3QaPy1KgI7nu9FJEQUgn6h"
      },
      {
        "title": "when the party's over",
        "artist": "Billie Eilish",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/2c7987ff3e9924676cf5573fea5b195ceb3be302",
        "spotifyUrl": "https://open.spotify.com/track/43zdsphuZLzwA9k4DJhU0I"
      },
      {
        "title": "Line Without a Hook",
        "artist": "Karlo Gutierrez, Alyssa Gutierrez",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/368732fa591d7dc1d1b51baaa20ae9623fdce74c",
        "spotifyUrl": "https://open.spotify.com/track/7dqLWPRU8sgZB4wmniRvaU"
      },
      {
        "title": "Until I Found You - Slowed + Reverb",
        "artist": "3slow2",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/4998ae5b9711689573e9f09370e2c8a218255b0e",
        "spotifyUrl": "https://open.spotify.com/track/3WeumNRtTwEA8ZZ5jUIBSJ"
      },
      {
        "title": "love.",
        "artist": "wave to earth",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/71/b6/82/71b6820b-97a2-9968-c5a8-b659103030b1/5054197659843.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/5af5afdcef449c1c6d64f858b1f4e0d798727b58",
        "spotifyUrl": "https://open.spotify.com/track/5mtTAScDytxMMqZj14NmlN"
      },
      {
        "title": "Back in Time",
        "artist": "Ember Quinn Taylor",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/4e0531a532a5040cee7c04ab518b4fa9743ad755",
        "spotifyUrl": "https://open.spotify.com/track/3bFP6hF64nij7x31p0Cx9t"
      },
      {
        "title": "Call Home",
        "artist": "Gustixa, Trevor Poole, Daniel Saint",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/8a84ef79933a1b550e64cd053c9c63e94600c7cf",
        "spotifyUrl": "https://open.spotify.com/track/7gQaj7SEBDDLEWFKIUL4tG"
      },
      {
        "title": "Iqro'",
        "artist": "Rainsomn",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/38702c03ae373b5bc929bab97aa49f8698575ac0",
        "spotifyUrl": "https://open.spotify.com/track/4zudXSDZpccoeYqln43X1u"
      },
      {
        "title": "Ada Titik-Titik Di Ujung Doa - Acoustic Version",
        "artist": "Rainsomn",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/2e978f79e22c7786db6e145ffd8b3b4f6c9b3155",
        "spotifyUrl": "https://open.spotify.com/track/0MsjjLR1EVWAH7phOaygiL"
      },
      {
        "title": "Risk It All - Acoustic Version",
        "artist": "Rainsomn",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/8392b4048fb003b8cd8410926d9c0845084ec602",
        "spotifyUrl": "https://open.spotify.com/track/7CrO9jcS8zgoudH2M2y90X"
      },
      {
        "title": "Kota Ini Tak Sama Tanpamu - Lofi Chill Ver.",
        "artist": "Rainsomn",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/9885618fd59ddbed5247a741350c7f9f6eae9ccf",
        "spotifyUrl": "https://open.spotify.com/track/3rjBCDQRDv5JmGd2q5508P"
      },
      {
        "title": "Kita Buat Menyenangkan",
        "artist": "Rainsomn",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/493aef96b69bf7fa19de16703d657fa211c7f4f6",
        "spotifyUrl": "https://open.spotify.com/track/4StSrRMkGTxGlfKttRXYOH"
      },
      {
        "title": "So Easy - Slowed & Reverb",
        "artist": "Rainsomn",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/a06ad76d9019d5ef3c9b9b070b1fa2e5f4cc9468",
        "spotifyUrl": "https://open.spotify.com/track/6VX1EmW0ApcOBFx4HY5K6j"
      },
      {
        "title": "More Than Words",
        "artist": "Rainsomn",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/9db2eafb3afcbef8d9ec8adfaab56f88a8c2fa13",
        "spotifyUrl": "https://open.spotify.com/track/79gvUjSTtRhGfbDRJxkr5L"
      },
      {
        "title": "Can't Smile Without You",
        "artist": "Rainsomn",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/cc061a21aae278df2e7cada0e9ecbc8d6abf95b9",
        "spotifyUrl": "https://open.spotify.com/track/64zBX51KWGSBZaGQwRImSA"
      },
      {
        "title": "seasons",
        "artist": "wave to earth",
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/fa/c5/61/fac561dc-8db4-b2e9-d3db-6e246da72bfa/5054197890017.jpg/600x600bb.jpg",
        "src": "https://p.scdn.co/mp3-preview/6300acd85a89974a70726348cf0e5296d001a650",
        "spotifyUrl": "https://open.spotify.com/track/0aVd7QiY8BstysHb62c5Fi"
      },
      {
        "title": "Mangu (feat. DAMAR)",
        "artist": "Dept, DAMAR",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/8aaf272f10798078be8cadd8b600c99b631c6aa7",
        "spotifyUrl": "https://open.spotify.com/track/2H46zX5Bh8HK29T85TRf5c"
      },
      {
        "title": "Wise Man Say",
        "artist": "Sadexa",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/73320851752f52505d43f297342897aab877fab7",
        "spotifyUrl": "https://open.spotify.com/track/1O8lIre2zFdBDCRJjYQdy8"
      },
      {
        "title": "ghostin'",
        "artist": "Derai",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/71dfafde2a6e0d07f744aa7eed7ffa4f0b096e32",
        "spotifyUrl": "https://open.spotify.com/track/7qjLapfDfgpFZbTu0T6pXy"
      },
      {
        "title": "Strawberry Champagne - Slowed",
        "artist": "Dept",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/a6df1d840d07b63a527ab427664cc06cc9a53e36",
        "spotifyUrl": "https://open.spotify.com/track/79o21tviIxJJj1xh7HWCRA"
      },
      {
        "title": "Moving On",
        "artist": "Lola Yulia",
        "cover": "https://mosaic.scdn.co/640/ab67616d00001e0249da38f55c44f022c7000a1cab67616d00001e026ce078028ce237557b811d66ab67616d00001e02a4e53ff2551566c59e2aa1a3ab67616d00001e02c8820bf735e7d13173190f28",
        "src": "https://p.scdn.co/mp3-preview/361011b22344d980bb5ebedde6e3ff7c8be01a4c",
        "spotifyUrl": "https://open.spotify.com/track/2yLHEfWTBmpa5t425UvGST"
      }
    ]
  }
];
