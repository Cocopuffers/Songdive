'use strict';
// SongDive 3.0: static-site curated catalog and editorial rarity. No streaming or player analytics.
// SongDive 3.0 curated catalog. Rank is editorial ordering within artist, NOT streaming statistics.
const catalogRows = [["Shake It Off","Taylor Swift","pop",0],["Blank Space","Taylor Swift","pop",1],["Love Story","Taylor Swift","pop",2],["You Belong with Me","Taylor Swift","pop",3],["Anti-Hero","Taylor Swift","pop",4],["Cruel Summer","Taylor Swift","pop",5],["Style","Taylor Swift","pop",6],["Wildest Dreams","Taylor Swift","pop",7],["Bad Blood","Taylor Swift","pop",8],["Cardigan","Taylor Swift","pop",9],["All Too Well","Taylor Swift","pop",10],["22","Taylor Swift","pop",11],["We Are Never Ever Getting Back Together","Taylor Swift","pop",12],["I Knew You Were Trouble","Taylor Swift","pop",13],["Delicate","Taylor Swift","pop",14],["Lover","Taylor Swift","pop",15],["Fortnight","Taylor Swift","pop",16],["Enchanted","Taylor Swift","pop",17],["August","Taylor Swift","pop",18],["Willow","Taylor Swift","pop",19],["The Archer","Taylor Swift","pop",20],["Getaway Car","Taylor Swift","pop",21],["Champagne Problems","Taylor Swift","pop",22],["The 1","Taylor Swift","pop",23],["Maroon","Taylor Swift","pop",24],["Exile","Taylor Swift","pop",25],["Lavender Haze","Taylor Swift","pop",26],["Karma","Taylor Swift","pop",27],["Fearless","Taylor Swift","pop",28],["Our Song","Taylor Swift","pop",29],["God's Plan","Drake","hiphop",0],["Hotline Bling","Drake","hiphop",1],["One Dance","Drake","hiphop",2],["In My Feelings","Drake","hiphop",3],["Nice for What","Drake","hiphop",4],["Started from the Bottom","Drake","hiphop",5],["Hold On We're Going Home","Drake","hiphop",6],["Passionfruit","Drake","hiphop",7],["Nonstop","Drake","hiphop",8],["Laugh Now Cry Later","Drake","hiphop",9],["Toosie Slide","Drake","hiphop",10],["Rich Flex","Drake","hiphop",11],["Find Your Love","Drake","hiphop",12],["Best I Ever Had","Drake","hiphop",13],["Headlines","Drake","hiphop",14],["Marvins Room","Drake","hiphop",15],["Take Care","Drake","hiphop",16],["Energy","Drake","hiphop",17],["Controlla","Drake","hiphop",18],["Know Yourself","Drake","hiphop",19],["Jimmy Cooks","Drake","hiphop",20],["Search and Rescue","Drake","hiphop",21],["First Person Shooter","Drake","hiphop",22],["Over","Drake","hiphop",23],["Worst Behavior","Drake","hiphop",24],["Blinding Lights","The Weeknd","pop",0],["Starboy","The Weeknd","pop",1],["Save Your Tears","The Weeknd","pop",2],["Can't Feel My Face","The Weeknd","pop",3],["The Hills","The Weeknd","pop",4],["Die for You","The Weeknd","pop",5],["I Feel It Coming","The Weeknd","pop",6],["Earned It","The Weeknd","pop",7],["Heartless","The Weeknd","pop",8],["Call Out My Name","The Weeknd","pop",9],["In Your Eyes","The Weeknd","pop",10],["Out of Time","The Weeknd","pop",11],["Often","The Weeknd","pop",12],["Wicked Games","The Weeknd","pop",13],["After Hours","The Weeknd","pop",14],["Sacrifice","The Weeknd","pop",15],["Take My Breath","The Weeknd","pop",16],["Is There Someone Else?","The Weeknd","pop",17],["Less Than Zero","The Weeknd","pop",18],["Reminder","The Weeknd","pop",19],["Single Ladies","Beyoncé","rnb",0],["Crazy in Love","Beyoncé","rnb",1],["Halo","Beyoncé","rnb",2],["Irreplaceable","Beyoncé","rnb",3],["Formation","Beyoncé","rnb",4],["Love on Top","Beyoncé","rnb",5],["Drunk in Love","Beyoncé","rnb",6],["Break My Soul","Beyoncé","rnb",7],["Cuff It","Beyoncé","rnb",8],["Texas Hold 'Em","Beyoncé","rnb",9],["If I Were a Boy","Beyoncé","rnb",10],["Run the World (Girls)","Beyoncé","rnb",11],["Partition","Beyoncé","rnb",12],["Sorry","Beyoncé","rnb",13],["Hold Up","Beyoncé","rnb",14],["Déjà Vu","Beyoncé","rnb",15],["Sweet Dreams","Beyoncé","rnb",16],["Countdown","Beyoncé","rnb",17],["Alien Superstar","Beyoncé","rnb",18],["16 Carriages","Beyoncé","rnb",19],["Thank U Next","Ariana Grande","pop",0],["7 Rings","Ariana Grande","pop",1],["No Tears Left to Cry","Ariana Grande","pop",2],["Into You","Ariana Grande","pop",3],["Side to Side","Ariana Grande","pop",4],["Problem","Ariana Grande","pop",5],["Positions","Ariana Grande","pop",6],["We Can't Be Friends","Ariana Grande","pop",7],["Yes And?","Ariana Grande","pop",8],["One Last Time","Ariana Grande","pop",9],["God Is a Woman","Ariana Grande","pop",10],["Dangerous Woman","Ariana Grande","pop",11],["Break Free","Ariana Grande","pop",12],["34+35","Ariana Grande","pop",13],["The Boy Is Mine","Ariana Grande","pop",14],["Eternal Sunshine","Ariana Grande","pop",15],["POV","Ariana Grande","pop",16],["Breathin","Ariana Grande","pop",17],["Santa Tell Me","Ariana Grande","pop",18],["Love Me Harder","Ariana Grande","pop",19],["Bad Guy","Billie Eilish","pop",0],["Birds of a Feather","Billie Eilish","pop",1],["Lovely","Billie Eilish","pop",2],["Ocean Eyes","Billie Eilish","pop",3],["Happier Than Ever","Billie Eilish","pop",4],["What Was I Made For?","Billie Eilish","pop",5],["When the Party's Over","Billie Eilish","pop",6],["Everything I Wanted","Billie Eilish","pop",7],["Lunch","Billie Eilish","pop",8],["Therefore I Am","Billie Eilish","pop",9],["Bury a Friend","Billie Eilish","pop",10],["Bellyache","Billie Eilish","pop",11],["Chihiro","Billie Eilish","pop",12],["Wildflower","Billie Eilish","pop",13],["Blue","Billie Eilish","pop",14],["Your Power","Billie Eilish","pop",15],["My Future","Billie Eilish","pop",16],["Idontwannabeyouanymore","Billie Eilish","pop",17],["NDA","Billie Eilish","pop",18],["The Greatest","Billie Eilish","pop",19],["Drivers License","Olivia Rodrigo","pop",0],["Good 4 U","Olivia Rodrigo","pop",1],["Vampire","Olivia Rodrigo","pop",2],["Deja Vu","Olivia Rodrigo","pop",3],["Traitor","Olivia Rodrigo","pop",4],["Brutal","Olivia Rodrigo","pop",5],["Get Him Back!","Olivia Rodrigo","pop",6],["Bad Idea Right?","Olivia Rodrigo","pop",7],["All-American Bitch","Olivia Rodrigo","pop",8],["Happier","Olivia Rodrigo","pop",9],["Favorite Crime","Olivia Rodrigo","pop",10],["Jealousy Jealousy","Olivia Rodrigo","pop",11],["Logical","Olivia Rodrigo","pop",12],["The Grudge","Olivia Rodrigo","pop",13],["Teenage Dream","Olivia Rodrigo","pop",14],["Obsessed","Olivia Rodrigo","pop",15],["Love Is Embarrassing","Olivia Rodrigo","pop",16],["Making the Bed","Olivia Rodrigo","pop",17],["Pretty Isn't Pretty","Olivia Rodrigo","pop",18],["Lacy","Olivia Rodrigo","pop",19],["Espresso","Sabrina Carpenter","pop",0],["Please Please Please","Sabrina Carpenter","pop",1],["Taste","Sabrina Carpenter","pop",2],["Feather","Sabrina Carpenter","pop",3],["Nonsense","Sabrina Carpenter","pop",4],["Bed Chem","Sabrina Carpenter","pop",5],["Juno","Sabrina Carpenter","pop",6],["Good Graces","Sabrina Carpenter","pop",7],["Because I Liked a Boy","Sabrina Carpenter","pop",8],["Skin","Sabrina Carpenter","pop",9],["Fast Times","Sabrina Carpenter","pop",10],["Sue Me","Sabrina Carpenter","pop",11],["Thumbs","Sabrina Carpenter","pop",12],["Coincidence","Sabrina Carpenter","pop",13],["Sharpest Tool","Sabrina Carpenter","pop",14],["Dumb and Poetic","Sabrina Carpenter","pop",15],["Levitating","Dua Lipa","pop",0],["Don't Start Now","Dua Lipa","pop",1],["New Rules","Dua Lipa","pop",2],["Houdini","Dua Lipa","pop",3],["Dance the Night","Dua Lipa","pop",4],["Physical","Dua Lipa","pop",5],["Break My Heart","Dua Lipa","pop",6],["One Kiss","Dua Lipa","pop",7],["IDGAF","Dua Lipa","pop",8],["Training Season","Dua Lipa","pop",9],["Love Again","Dua Lipa","pop",10],["Hallucinate","Dua Lipa","pop",11],["We're Good","Dua Lipa","pop",12],["Be the One","Dua Lipa","pop",13],["Illusion","Dua Lipa","pop",14],["Cold Heart","Dua Lipa","pop",15],["Electricity","Dua Lipa","pop",16],["As It Was","Harry Styles","pop",0],["Watermelon Sugar","Harry Styles","pop",1],["Sign of the Times","Harry Styles","pop",2],["Adore You","Harry Styles","pop",3],["Late Night Talking","Harry Styles","pop",4],["Golden","Harry Styles","pop",5],["Kiwi","Harry Styles","pop",6],["Music for a Sushi Restaurant","Harry Styles","pop",7],["Falling","Harry Styles","pop",8],["Satellite","Harry Styles","pop",9],["Matilda","Harry Styles","pop",10],["Daylight","Harry Styles","pop",11],["Fine Line","Harry Styles","pop",12],["Lights Up","Harry Styles","pop",13],["Cherry","Harry Styles","pop",14],["Shape of You","Ed Sheeran","pop",0],["Perfect","Ed Sheeran","pop",1],["Thinking Out Loud","Ed Sheeran","pop",2],["Bad Habits","Ed Sheeran","pop",3],["Photograph","Ed Sheeran","pop",4],["Castle on the Hill","Ed Sheeran","pop",5],["Shivers","Ed Sheeran","pop",6],["The A Team","Ed Sheeran","pop",7],["Galway Girl","Ed Sheeran","pop",8],["Eyes Closed","Ed Sheeran","pop",9],["Lego House","Ed Sheeran","pop",10],["Happier","Ed Sheeran","pop",11],["I Don't Care","Ed Sheeran","pop",12],["Afterglow","Ed Sheeran","pop",13],["Sing","Ed Sheeran","pop",14],["Don't","Ed Sheeran","pop",15],["Celestial","Ed Sheeran","pop",16],["Uptown Funk","Bruno Mars","pop",0],["Just the Way You Are","Bruno Mars","pop",1],["Grenade","Bruno Mars","pop",2],["Locked Out of Heaven","Bruno Mars","pop",3],["24K Magic","Bruno Mars","pop",4],["That's What I Like","Bruno Mars","pop",5],["When I Was Your Man","Bruno Mars","pop",6],["Treasure","Bruno Mars","pop",7],["Marry You","Bruno Mars","pop",8],["Talking to the Moon","Bruno Mars","pop",9],["The Lazy Song","Bruno Mars","pop",10],["Versace on the Floor","Bruno Mars","pop",11],["Finesse","Bruno Mars","pop",12],["Leave the Door Open","Bruno Mars","pop",13],["Die With a Smile","Bruno Mars","pop",14],["Umbrella","Rihanna","rnb",0],["Diamonds","Rihanna","rnb",1],["We Found Love","Rihanna","rnb",2],["Work","Rihanna","rnb",3],["Only Girl (In the World)","Rihanna","rnb",4],["Stay","Rihanna","rnb",5],["Love on the Brain","Rihanna","rnb",6],["Disturbia","Rihanna","rnb",7],["Don't Stop the Music","Rihanna","rnb",8],["What's My Name?","Rihanna","rnb",9],["Rude Boy","Rihanna","rnb",10],["S&M","Rihanna","rnb",11],["Where Have You Been","Rihanna","rnb",12],["Needed Me","Rihanna","rnb",13],["Take a Bow","Rihanna","rnb",14],["Unfaithful","Rihanna","rnb",15],["Pon de Replay","Rihanna","rnb",16],["FourFiveSeconds","Rihanna","rnb",17],["HUMBLE.","Kendrick Lamar","hiphop",0],["Not Like Us","Kendrick Lamar","hiphop",1],["DNA.","Kendrick Lamar","hiphop",2],["Alright","Kendrick Lamar","hiphop",3],["Swimming Pools (Drank)","Kendrick Lamar","hiphop",4],["Money Trees","Kendrick Lamar","hiphop",5],["LOVE.","Kendrick Lamar","hiphop",6],["All the Stars","Kendrick Lamar","hiphop",7],["King Kunta","Kendrick Lamar","hiphop",8],["Euphoria","Kendrick Lamar","hiphop",9],["Squabble Up","Kendrick Lamar","hiphop",10],["Luther","Kendrick Lamar","hiphop",11],["TV Off","Kendrick Lamar","hiphop",12],["Bitch Don't Kill My Vibe","Kendrick Lamar","hiphop",13],["The Heart Part 5","Kendrick Lamar","hiphop",14],["N95","Kendrick Lamar","hiphop",15],["Poetic Justice","Kendrick Lamar","hiphop",16],["Backseat Freestyle","Kendrick Lamar","hiphop",17],["Wesley's Theory","Kendrick Lamar","hiphop",18],["M.A.A.D City","Kendrick Lamar","hiphop",19],["SICKO MODE","Travis Scott","hiphop",0],["Goosebumps","Travis Scott","hiphop",1],["FE!N","Travis Scott","hiphop",2],["Highest in the Room","Travis Scott","hiphop",3],["Antidote","Travis Scott","hiphop",4],["Butterfly Effect","Travis Scott","hiphop",5],["Stargazing","Travis Scott","hiphop",6],["90210","Travis Scott","hiphop",7],["Hyaena","Travis Scott","hiphop",8],["My Eyes","Travis Scott","hiphop",9],["Telekinesis","Travis Scott","hiphop",10],["I Know ?","Travis Scott","hiphop",11],["MELTDOWN","Travis Scott","hiphop",12],["Pick Up the Phone","Travis Scott","hiphop",13],["Wake Up","Travis Scott","hiphop",14],["Rockstar","Post Malone","hiphop",0],["Circles","Post Malone","hiphop",1],["Sunflower","Post Malone","hiphop",2],["Congratulations","Post Malone","hiphop",3],["Better Now","Post Malone","hiphop",4],["White Iverson","Post Malone","hiphop",5],["Wow.","Post Malone","hiphop",6],["Chemical","Post Malone","hiphop",7],["I Fall Apart","Post Malone","hiphop",8],["Psycho","Post Malone","hiphop",9],["Candy Paint","Post Malone","hiphop",10],["Goodbyes","Post Malone","hiphop",11],["Mourning","Post Malone","hiphop",12],["Pour Me a Drink","Post Malone","hiphop",13],["I Had Some Help","Post Malone","hiphop",14],["Lose Yourself","Eminem","hiphop",0],["Without Me","Eminem","hiphop",1],["The Real Slim Shady","Eminem","hiphop",2],["Stan","Eminem","hiphop",3],["Mockingbird","Eminem","hiphop",4],["Love the Way You Lie","Eminem","hiphop",5],["Not Afraid","Eminem","hiphop",6],["Rap God","Eminem","hiphop",7],["Till I Collapse","Eminem","hiphop",8],["Houdini","Eminem","hiphop",9],["Godzilla","Eminem","hiphop",10],["Beautiful","Eminem","hiphop",11],["When I'm Gone","Eminem","hiphop",12],["The Monster","Eminem","hiphop",13],["Sing for the Moment","Eminem","hiphop",14],["Cleaning Out My Closet","Eminem","hiphop",15],["My Name Is","Eminem","hiphop",16],["Stronger","Kanye West","hiphop",0],["Gold Digger","Kanye West","hiphop",1],["Heartless","Kanye West","hiphop",2],["Flashing Lights","Kanye West","hiphop",3],["Runaway","Kanye West","hiphop",4],["Power","Kanye West","hiphop",5],["All of the Lights","Kanye West","hiphop",6],["Bound 2","Kanye West","hiphop",7],["Jesus Walks","Kanye West","hiphop",8],["Can't Tell Me Nothing","Kanye West","hiphop",9],["Good Life","Kanye West","hiphop",10],["Through the Wire","Kanye West","hiphop",11],["Father Stretch My Hands Pt. 1","Kanye West","hiphop",12],["Ultralight Beam","Kanye West","hiphop",13],["Ghost Town","Kanye West","hiphop",14],["Black Skinhead","Kanye West","hiphop",15],["Homecoming","Kanye West","hiphop",16],["Touch the Sky","Kanye West","hiphop",17],["Kill Bill","SZA","rnb",0],["Snooze","SZA","rnb",1],["Good Days","SZA","rnb",2],["Saturn","SZA","rnb",3],["Nobody Gets Me","SZA","rnb",4],["The Weekend","SZA","rnb",5],["Love Galore","SZA","rnb",6],["Broken Clocks","SZA","rnb",7],["Shirt","SZA","rnb",8],["I Hate U","SZA","rnb",9],["Open Arms","SZA","rnb",10],["Low","SZA","rnb",11],["Blind","SZA","rnb",12],["Drew Barrymore","SZA","rnb",13],["Garden (Say It Like Dat)","SZA","rnb",14],["20 Something","SZA","rnb",15],["Thinkin Bout You","Frank Ocean","rnb",0],["Pink + White","Frank Ocean","rnb",1],["Nights","Frank Ocean","rnb",2],["Chanel","Frank Ocean","rnb",3],["Lost","Frank Ocean","rnb",4],["Pyramids","Frank Ocean","rnb",5],["Ivy","Frank Ocean","rnb",6],["Self Control","Frank Ocean","rnb",7],["Novacane","Frank Ocean","rnb",8],["Swim Good","Frank Ocean","rnb",9],["White Ferrari","Frank Ocean","rnb",10],["Godspeed","Frank Ocean","rnb",11],["Super Rich Kids","Frank Ocean","rnb",12],["Bad Religion","Frank Ocean","rnb",13],["Provider","Frank Ocean","rnb",14],["Say So","Doja Cat","pop",0],["Paint the Town Red","Doja Cat","pop",1],["Kiss Me More","Doja Cat","pop",2],["Woman","Doja Cat","pop",3],["Agora Hills","Doja Cat","pop",4],["Streets","Doja Cat","pop",5],["Need to Know","Doja Cat","pop",6],["Vegas","Doja Cat","pop",7],["Attention","Doja Cat","pop",8],["Get Into It (Yuh)","Doja Cat","pop",9],["Juicy","Doja Cat","pop",10],["Rules","Doja Cat","pop",11],["Demons","Doja Cat","pop",12],["You Right","Doja Cat","pop",13],["Like That","Doja Cat","pop",14],["Bad Romance","Lady Gaga","pop",0],["Poker Face","Lady Gaga","pop",1],["Just Dance","Lady Gaga","pop",2],["Born This Way","Lady Gaga","pop",3],["Shallow","Lady Gaga","pop",4],["Telephone","Lady Gaga","pop",5],["Paparazzi","Lady Gaga","pop",6],["Alejandro","Lady Gaga","pop",7],["Applause","Lady Gaga","pop",8],["Rain on Me","Lady Gaga","pop",9],["The Edge of Glory","Lady Gaga","pop",10],["Million Reasons","Lady Gaga","pop",11],["Bloody Mary","Lady Gaga","pop",12],["Judas","Lady Gaga","pop",13],["Always Remember Us This Way","Lady Gaga","pop",14],["Firework","Katy Perry","pop",0],["Roar","Katy Perry","pop",1],["Dark Horse","Katy Perry","pop",2],["Teenage Dream","Katy Perry","pop",3],["California Gurls","Katy Perry","pop",4],["Last Friday Night (T.G.I.F.)","Katy Perry","pop",5],["I Kissed a Girl","Katy Perry","pop",6],["Hot N Cold","Katy Perry","pop",7],["Wide Awake","Katy Perry","pop",8],["The One That Got Away","Katy Perry","pop",9],["E.T.","Katy Perry","pop",10],["Part of Me","Katy Perry","pop",11],["Unconditionally","Katy Perry","pop",12],["Chained to the Rhythm","Katy Perry","pop",13],["Waking Up in Vegas","Katy Perry","pop",14],["Baby","Justin Bieber","pop",0],["Sorry","Justin Bieber","pop",1],["Love Yourself","Justin Bieber","pop",2],["Peaches","Justin Bieber","pop",3],["Stay","Justin Bieber","pop",4],["What Do You Mean?","Justin Bieber","pop",5],["Intentions","Justin Bieber","pop",6],["Ghost","Justin Bieber","pop",7],["Yummy","Justin Bieber","pop",8],["Boyfriend","Justin Bieber","pop",9],["Beauty and a Beat","Justin Bieber","pop",10],["As Long as You Love Me","Justin Bieber","pop",11],["Holy","Justin Bieber","pop",12],["Anyone","Justin Bieber","pop",13],["Company","Justin Bieber","pop",14],["Flowers","Miley Cyrus","pop",0],["Party in the U.S.A.","Miley Cyrus","pop",1],["Wrecking Ball","Miley Cyrus","pop",2],["We Can't Stop","Miley Cyrus","pop",3],["The Climb","Miley Cyrus","pop",4],["Used to Be Young","Miley Cyrus","pop",5],["Midnight Sky","Miley Cyrus","pop",6],["Malibu","Miley Cyrus","pop",7],["Angels Like You","Miley Cyrus","pop",8],["Jaded","Miley Cyrus","pop",9],["See You Again","Miley Cyrus","pop",10],["7 Things","Miley Cyrus","pop",11],["When I Look at You","Miley Cyrus","pop",12],["Adore You","Miley Cyrus","pop",13],["Hello","Adele","pop",0],["Someone Like You","Adele","pop",1],["Rolling in the Deep","Adele","pop",2],["Set Fire to the Rain","Adele","pop",3],["Easy on Me","Adele","pop",4],["Skyfall","Adele","pop",5],["When We Were Young","Adele","pop",6],["Send My Love (To Your New Lover)","Adele","pop",7],["Chasing Pavements","Adele","pop",8],["Rumour Has It","Adele","pop",9],["Water Under the Bridge","Adele","pop",10],["Turning Tables","Adele","pop",11],["All I Ask","Adele","pop",12],["Oh My God","Adele","pop",13],["Yellow","Coldplay","rock",0],["Viva la Vida","Coldplay","rock",1],["Fix You","Coldplay","rock",2],["The Scientist","Coldplay","rock",3],["A Sky Full of Stars","Coldplay","rock",4],["Paradise","Coldplay","rock",5],["Clocks","Coldplay","rock",6],["Adventure of a Lifetime","Coldplay","rock",7],["Hymn for the Weekend","Coldplay","rock",8],["Something Just Like This","Coldplay","rock",9],["Speed of Sound","Coldplay","rock",10],["In My Place","Coldplay","rock",11],["Magic","Coldplay","rock",12],["Higher Power","Coldplay","rock",13],["Sparks","Coldplay","rock",14],["Trouble","Coldplay","rock",15],["Radioactive","Imagine Dragons","rock",0],["Believer","Imagine Dragons","rock",1],["Thunder","Imagine Dragons","rock",2],["Demons","Imagine Dragons","rock",3],["Whatever It Takes","Imagine Dragons","rock",4],["Enemy","Imagine Dragons","rock",5],["Bones","Imagine Dragons","rock",6],["Natural","Imagine Dragons","rock",7],["It's Time","Imagine Dragons","rock",8],["On Top of the World","Imagine Dragons","rock",9],["Bad Liar","Imagine Dragons","rock",10],["Sharks","Imagine Dragons","rock",11],["Follow You","Imagine Dragons","rock",12],["Wrecked","Imagine Dragons","rock",13],["Do I Wanna Know?","Arctic Monkeys","rock",0],["505","Arctic Monkeys","rock",1],["I Wanna Be Yours","Arctic Monkeys","rock",2],["R U Mine?","Arctic Monkeys","rock",3],["Why'd You Only Call Me When You're High?","Arctic Monkeys","rock",4],["Fluorescent Adolescent","Arctic Monkeys","rock",5],["Arabella","Arctic Monkeys","rock",6],["Snap Out of It","Arctic Monkeys","rock",7],["Cornerstone","Arctic Monkeys","rock",8],["Mardy Bum","Arctic Monkeys","rock",9],["Brianstorm","Arctic Monkeys","rock",10],["Teddy Picker","Arctic Monkeys","rock",11],["Crying Lightning","Arctic Monkeys","rock",12],["A Certain Romance","Arctic Monkeys","rock",13],["Misery Business","Paramore","rock",0],["Still Into You","Paramore","rock",1],["Ain't It Fun","Paramore","rock",2],["The Only Exception","Paramore","rock",3],["Decode","Paramore","rock",4],["Hard Times","Paramore","rock",5],["This Is Why","Paramore","rock",6],["That's What You Get","Paramore","rock",7],["All I Wanted","Paramore","rock",8],["Crushcrushcrush","Paramore","rock",9],["Ignorance","Paramore","rock",10],["Rose-Colored Boy","Paramore","rock",11],["Brick by Boring Brick","Paramore","rock",12],["In the End","Linkin Park","rock",0],["Numb","Linkin Park","rock",1],["Crawling","Linkin Park","rock",2],["What I've Done","Linkin Park","rock",3],["One Step Closer","Linkin Park","rock",4],["Faint","Linkin Park","rock",5],["Breaking the Habit","Linkin Park","rock",6],["Somewhere I Belong","Linkin Park","rock",7],["Bleed It Out","Linkin Park","rock",8],["New Divide","Linkin Park","rock",9],["Burn It Down","Linkin Park","rock",10],["Lost","Linkin Park","rock",11],["The Emptiness Machine","Linkin Park","rock",12],["Heavy Is the Crown","Linkin Park","rock",13],["Boulevard of Broken Dreams","Green Day","rock",0],["American Idiot","Green Day","rock",1],["Wake Me Up When September Ends","Green Day","rock",2],["Basket Case","Green Day","rock",3],["Good Riddance (Time of Your Life)","Green Day","rock",4],["Holiday","Green Day","rock",5],["21 Guns","Green Day","rock",6],["When I Come Around","Green Day","rock",7],["Jesus of Suburbia","Green Day","rock",8],["Brain Stew","Green Day","rock",9],["Welcome to Paradise","Green Day","rock",10],["Longview","Green Day","rock",11],["Bohemian Rhapsody","Queen","rock",0],["We Will Rock You","Queen","rock",1],["We Are the Champions","Queen","rock",2],["Don't Stop Me Now","Queen","rock",3],["Another One Bites the Dust","Queen","rock",4],["Somebody to Love","Queen","rock",5],["Killer Queen","Queen","rock",6],["Radio Ga Ga","Queen","rock",7],["Under Pressure","Queen","rock",8],["I Want to Break Free","Queen","rock",9],["Crazy Little Thing Called Love","Queen","rock",10],["The Show Must Go On","Queen","rock",11],["You're My Best Friend","Queen","rock",12],["Love of My Life","Queen","rock",13],["Hey Jude","The Beatles","rock",0],["Let It Be","The Beatles","rock",1],["Yesterday","The Beatles","rock",2],["Come Together","The Beatles","rock",3],["Here Comes the Sun","The Beatles","rock",4],["Help!","The Beatles","rock",5],["Twist and Shout","The Beatles","rock",6],["Something","The Beatles","rock",7],["All You Need Is Love","The Beatles","rock",8],["A Hard Day's Night","The Beatles","rock",9],["Eleanor Rigby","The Beatles","rock",10],["Blackbird","The Beatles","rock",11],["Penny Lane","The Beatles","rock",12],["Strawberry Fields Forever","The Beatles","rock",13],["Lucy in the Sky with Diamonds","The Beatles","rock",14],["While My Guitar Gently Weeps","The Beatles","rock",15],["Dreams","Fleetwood Mac","rock",0],["Go Your Own Way","Fleetwood Mac","rock",1],["The Chain","Fleetwood Mac","rock",2],["Landslide","Fleetwood Mac","rock",3],["Everywhere","Fleetwood Mac","rock",4],["Rhiannon","Fleetwood Mac","rock",5],["Don't Stop","Fleetwood Mac","rock",6],["Little Lies","Fleetwood Mac","rock",7],["Gypsy","Fleetwood Mac","rock",8],["Silver Springs","Fleetwood Mac","rock",9],["You Make Loving Fun","Fleetwood Mac","rock",10],["Gold Dust Woman","Fleetwood Mac","rock",11],["Billie Jean","Michael Jackson","pop",0],["Thriller","Michael Jackson","pop",1],["Beat It","Michael Jackson","pop",2],["Smooth Criminal","Michael Jackson","pop",3],["Bad","Michael Jackson","pop",4],["Man in the Mirror","Michael Jackson","pop",5],["Black or White","Michael Jackson","pop",6],["The Way You Make Me Feel","Michael Jackson","pop",7],["Don't Stop 'Til You Get Enough","Michael Jackson","pop",8],["Rock with You","Michael Jackson","pop",9],["Remember the Time","Michael Jackson","pop",10],["Human Nature","Michael Jackson","pop",11],["Dirty Diana","Michael Jackson","pop",12],["P.Y.T. (Pretty Young Thing)","Michael Jackson","pop",13],["Purple Rain","Prince","rnb",0],["When Doves Cry","Prince","rnb",1],["Kiss","Prince","rnb",2],["1999","Prince","rnb",3],["Little Red Corvette","Prince","rnb",4],["Raspberry Beret","Prince","rnb",5],["Let's Go Crazy","Prince","rnb",6],["I Wanna Be Your Lover","Prince","rnb",7],["Sign o' the Times","Prince","rnb",8],["Diamonds and Pearls","Prince","rnb",9],["The Most Beautiful Girl in the World","Prince","rnb",10],["Rocket Man","Elton John","pop",0],["Tiny Dancer","Elton John","pop",1],["Your Song","Elton John","pop",2],["I'm Still Standing","Elton John","pop",3],["Crocodile Rock","Elton John","pop",4],["Bennie and the Jets","Elton John","pop",5],["Don't Go Breaking My Heart","Elton John","pop",6],["Goodbye Yellow Brick Road","Elton John","pop",7],["Saturday Night's Alright for Fighting","Elton John","pop",8],["Sacrifice","Elton John","pop",9],["Candle in the Wind","Elton John","pop",10],["Daniel","Elton John","pop",11],["Dancing Queen","ABBA","pop",0],["Mamma Mia","ABBA","pop",1],["Gimme! Gimme! Gimme!","ABBA","pop",2],["Take a Chance on Me","ABBA","pop",3],["Waterloo","ABBA","pop",4],["The Winner Takes It All","ABBA","pop",5],["Fernando","ABBA","pop",6],["Super Trouper","ABBA","pop",7],["Voulez-Vous","ABBA","pop",8],["Knowing Me Knowing You","ABBA","pop",9],["SOS","ABBA","pop",10],["Chiquitita","ABBA","pop",11],["Fast Car","Luke Combs","country",0],["Beautiful Crazy","Luke Combs","country",1],["When It Rains It Pours","Luke Combs","country",2],["Beer Never Broke My Heart","Luke Combs","country",3],["Hurricane","Luke Combs","country",4],["Forever After All","Luke Combs","country",5],["The Kind of Love We Make","Luke Combs","country",6],["Love You Anyway","Luke Combs","country",7],["Even Though I'm Leaving","Luke Combs","country",8],["Where the Wild Things Are","Luke Combs","country",9],["Ain't No Love in Oklahoma","Luke Combs","country",10],["Last Night","Morgan Wallen","country",0],["Whiskey Glasses","Morgan Wallen","country",1],["Wasted on You","Morgan Wallen","country",2],["You Proof","Morgan Wallen","country",3],["Sand in My Boots","Morgan Wallen","country",4],["Chasin' You","Morgan Wallen","country",5],["Thought You Should Know","Morgan Wallen","country",6],["One Thing at a Time","Morgan Wallen","country",7],["Cowgirls","Morgan Wallen","country",8],["I Had Some Help","Morgan Wallen","country",9],["Love Somebody","Morgan Wallen","country",10],["7 Summers","Morgan Wallen","country",11],["More Than My Hometown","Morgan Wallen","country",12],["Something in the Orange","Zach Bryan","country",0],["I Remember Everything","Zach Bryan","country",1],["Pink Skies","Zach Bryan","country",2],["Heading South","Zach Bryan","country",3],["Oklahoma Smokeshow","Zach Bryan","country",4],["Sun to Me","Zach Bryan","country",5],["Burn Burn Burn","Zach Bryan","country",6],["Dawns","Zach Bryan","country",7],["Revival","Zach Bryan","country",8],["Nine Ball","Zach Bryan","country",9],["Tourniquet","Zach Bryan","country",10],["American Nights","Zach Bryan","country",11],["Jolene","Dolly Parton","country",0],["9 to 5","Dolly Parton","country",1],["I Will Always Love You","Dolly Parton","country",2],["Coat of Many Colors","Dolly Parton","country",3],["Here You Come Again","Dolly Parton","country",4],["Islands in the Stream","Dolly Parton","country",5],["Two Doors Down","Dolly Parton","country",6],["Love Is Like a Butterfly","Dolly Parton","country",7],["The Bargain Store","Dolly Parton","country",8],["Ring of Fire","Johnny Cash","country",0],["Hurt","Johnny Cash","country",1],["Folsom Prison Blues","Johnny Cash","country",2],["I Walk the Line","Johnny Cash","country",3],["Jackson","Johnny Cash","country",4],["A Boy Named Sue","Johnny Cash","country",5],["Man in Black","Johnny Cash","country",6],["Sunday Morning Coming Down","Johnny Cash","country",7],["Get Rhythm","Johnny Cash","country",8],["Ghost Riders in the Sky","Johnny Cash","country",9],["Man! I Feel Like a Woman!","Shania Twain","country",0],["You're Still the One","Shania Twain","country",1],["That Don't Impress Me Much","Shania Twain","country",2],["From This Moment On","Shania Twain","country",3],["Any Man of Mine","Shania Twain","country",4],["Honey I'm Home","Shania Twain","country",5],["Forever and for Always","Shania Twain","country",6],["Up!","Shania Twain","country",7],["I'm Gonna Getcha Good!","Shania Twain","country",8],["Tití Me Preguntó","Bad Bunny","latin",0],["Me Porto Bonito","Bad Bunny","latin",1],["Dakiti","Bad Bunny","latin",2],["Moscow Mule","Bad Bunny","latin",3],["Ojitos Lindos","Bad Bunny","latin",4],["Yonaguni","Bad Bunny","latin",5],["Callaíta","Bad Bunny","latin",6],["Safaera","Bad Bunny","latin",7],["La Noche de Anoche","Bad Bunny","latin",8],["Neverita","Bad Bunny","latin",9],["Un Verano Sin Ti","Bad Bunny","latin",10],["Monaco","Bad Bunny","latin",11],["Where She Goes","Bad Bunny","latin",12],["Un Preview","Bad Bunny","latin",13],["Efecto","Bad Bunny","latin",14],["TQG","Karol G","latin",0],["Provenza","Karol G","latin",1],["Tusa","Karol G","latin",2],["Si Antes Te Hubiera Conocido","Karol G","latin",3],["Bichota","Karol G","latin",4],["Mi Ex Tenía Razón","Karol G","latin",5],["Amargura","Karol G","latin",6],["Ocean","Karol G","latin",7],["Cairo","Karol G","latin",8],["Mientras Me Curo del Cora","Karol G","latin",9],["Qlona","Karol G","latin",10],["Hips Don't Lie","Shakira","latin",0],["Whenever Wherever","Shakira","latin",1],["Waka Waka (This Time for Africa)","Shakira","latin",2],["She Wolf","Shakira","latin",3],["Underneath Your Clothes","Shakira","latin",4],["La Tortura","Shakira","latin",5],["Chantaje","Shakira","latin",6],["Te Felicito","Shakira","latin",7],["Monotonía","Shakira","latin",8],["Try Everything","Shakira","latin",9],["Objection (Tango)","Shakira","latin",10],["Gasolina","Daddy Yankee","latin",0],["Despacito","Daddy Yankee","latin",1],["Con Calma","Daddy Yankee","latin",2],["Dura","Daddy Yankee","latin",3],["Rompe","Daddy Yankee","latin",4],["Limbo","Daddy Yankee","latin",5],["Lo Que Pasó Pasó","Daddy Yankee","latin",6],["Shaky Shaky","Daddy Yankee","latin",7],["China","Daddy Yankee","latin",8],["Ella Me Levantó","Daddy Yankee","latin",9],["Blue Monday","New Order","rock",5],["Back in Black","AC/DC","rock",5],["Red Right Hand","Nick Cave & the Bad Seeds","rock",5],["Black Dog","Led Zeppelin","rock",5],["Eye of the Tiger","Survivor","rock",5],["Call Me Maybe","Carly Rae Jepsen","pop",5],["Some Nights","fun.","pop",5],["Free Bird","Lynyrd Skynyrd","rock",5],["American Pie","Don McLean","rock",5],["Sweet Home Alabama","Lynyrd Skynyrd","rock",5],["New York State of Mind","Billy Joel","pop",5],["Hotel California","Eagles","rock",5],["Africa","Toto","rock",5]];
const songs = catalogRows.map(([title,artist,genre,rank])=>({title,artist,genre,rank}));
const titleRules = [
  ['Name a song with a color in its title.', /\b(yellow|purple|blue|black|red|green|white|pink|gold|silver|golden)\b/i],
  ['Name a song with a number in its title.', /\d/],
  ['Name a song with a place in its title.', /\b(california|alabama|africa|new york|america|american|paradise|london|tokyo|vegas|oklahoma|galway|georgia|carolina|texas|home|city|ocean)\b/i],
  ['Name a song with an animal in its title.', /\b(dog|tiger|bird|cat|horse|wolf|butterfly|sharks|doves)\b/i],
  ['Name a song with a day or time in its title.', /\b(monday|friday|saturday|sunday|night|morning|midnight|today|tomorrow|yesterday|summer|september)\b/i],
  ['Name a song with love in its title.', /\blove\b/i],
  ['Name a song with a weather word in its title.', /\b(rain|thunder|hurricane|sky|sun|sunflower|snow|storm|fire)\b/i],
  ['Name a song with a feeling in its title.', /\b(happy|happier|sad|sorry|bad|good|crazy|beautiful|lonely|fearless|jealousy|hate)\b/i]
];
const prompts = [
 ...titleRules.map(([text,regex])=>({text,test:s=>regex.test(s.title)})),
 ...['pop','hiphop','rnb','rock','country','latin'].map(genre=>({text:`Name a ${ {pop:'pop',hiphop:'rap or hip-hop',rnb:'R&B',rock:'rock',country:'country',latin:'Latin'}[genre] } song.`,test:s=>s.genre===genre})),
 ...[...new Set(songs.map(s=>s.artist))].filter(artist=>songs.filter(s=>s.artist===artist).length>=9).map(artist=>({text:`Name a song by ${artist}.`,test:s=>s.artist===artist}))
].filter(p=>songs.filter(p.test).length>=8);
const $=id=>document.getElementById(id);
const ROUND_COUNT=7,ROUND_SECONDS=25,MAX_SCORE=630;
let sessionNumber=0,dailyPrompts=[],roundIndex=0,totalScore=0,deadline=0,timer=null,locked=false,history=[],filterTier='ALL',soundEnabled=false,audioContext=null,musicLoop=null,musicStep=0,masterGain=null;
const ranks=[
{max:99,name:'Novice Head Bopper',description:'You know the beat. The lyrics? Not so much.'},
{max:199,name:'Shower Concert Star',description:'Your bathroom acoustics are carrying your career.'},
{max:299,name:'Certified Aux Hog',description:'Nobody gave you the aux. You took it.'},
{max:399,name:'Playlist Menace',description:"You've got a playlist for situations that haven't happened yet."},
{max:499,name:'Melody Mastermind',description:"You've got a song for literally everything."},
{max:579,name:'Human Jukebox',description:'Somebody says a word and you start singing.'},
{max:630,name:'The Final Encore',description:"The crowd left an hour ago. You're still performing."}
];
function showScreen(id){['intro','game','result','final'].forEach(name=>$(name).classList.toggle('hidden',name!==id));}
function dateKey(){// UTC ensures everyone gets the same daily prompts on the same UTC date.
return new Date().toISOString().slice(0,10);}
function getDailyPrompts(){let seed=0;for(const c of dateKey()+':'+sessionNumber)seed=(Math.imul(seed,31)+c.charCodeAt(0))>>>0;
const pool=[...prompts];for(let i=pool.length-1;i>0;i--){seed=(Math.imul(seed,1664525)+1013904223)>>>0;const j=seed%(i+1);[pool[i],pool[j]]=[pool[j],pool[i]];}return pool.slice(0,ROUND_COUNT);}
function normalize(s){return String(s).normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' ');}
// Exact title, title + artist, and common release suffixes are recognized without a correction.
function songKeys(song){const title=normalize(song.title),artist=normalize(song.artist);
  return [title,`${title} ${artist}`,`${title} by ${artist}`];}
function findSong(input,prompt){const q=normalize(input);if(!q)return null;
 const matches=songs.filter(song=>songKeys(song).includes(q));
 const eligible=matches.filter(prompt.test);
 return eligible.length===1?eligible[0]:matches.length===1?matches[0]:null;
}
function editDistance(a,b){const previous=Array.from({length:b.length+1},(_,i)=>i);
  for(let i=1;i<=a.length;i++){let prior=previous[0];previous[0]=i;
    for(let j=1;j<=b.length;j++){const saved=previous[j];previous[j]=Math.min(previous[j]+1,previous[j-1]+1,prior+(a[i-1]===b[j-1]?0:1));prior=saved;}}
  return previous[b.length];}
function findCorrection(input,prompt){const q=normalize(input);if(q.length<4)return null;
  const eligible=songs.filter(song=>prompt.test(song));
  const candidates=eligible.map(song=>{
    const distances=songKeys(song).map(key=>editDistance(q,key));
    return {song,distance:Math.min(...distances)};
  }).sort((a,b)=>a.distance-b.distance);
  if(!candidates.length)return null;
  const best=candidates[0],runnerUp=candidates[1];
  // A 75% similarity floor alone is too permissive for short titles.
  const allowance=Math.min(3,Math.max(1,Math.floor(q.length*.2)));
  if(best.distance>allowance || (runnerUp&&runnerUp.distance<=best.distance+1))return null;
  return best.song;
}
let pendingCorrection=null;
function clearCorrection(){pendingCorrection=null;$('feedback').classList.remove('good');}
function usedSong(song){return history.some(h=>h.songKey===normalize(`${song.title} ${song.artist}`));}
function scoreFor(song,prompt){if(!song||!prompt.test(song))return {points:0,tier:'MISS'};
  // Curated artist-relative tiers; lower editorial rank = bigger hit, not measured streams.
  const peers=songs.filter(s=>s.artist===song.artist).sort((a,b)=>a.rank-b.rank);
  const position=peers.findIndex(s=>s===song);
  const fraction=peers.length<=1?0:position/(peers.length-1);
  const points=[25,40,65,90][Math.min(3,Math.floor(fraction*4))];
  return {points,tier:points===90?'ULTRA RARE':points===65?'RARE':points===40?'UNCOMMON':'COMMON'};
}
// SongDive 2.4: the countdown is an explicit, cancellable round state.
let countdownHandle=null, countdownToken=0, roundReady=false;
function cancelCountdown(){
  countdownToken++;
  if(countdownHandle!==null)clearTimeout(countdownHandle);
  countdownHandle=null;
  const overlay=$('roundCountdown');overlay.classList.add('hidden');$('questionCard').classList.remove('question-arriving','question-ready');
}
function stopTimer(){if(timer!==null){clearInterval(timer);timer=null;}}
function updateTimer(){const remaining=Math.max(0,Math.ceil((deadline-performance.now())/1000));$('timer').textContent=remaining;$('timerWrap').classList.toggle('danger',remaining<=5);if(remaining<=0&&!locked)expireRound();}
function startGame(){cancelCountdown();clearCelebration();stopTimer();sessionNumber++;dailyPrompts=getDailyPrompts();roundIndex=0;totalScore=0;history=[];clearCorrection();$('shareBtn').innerHTML='Share my score <span>↗</span>';startRound();}
function startRound(){
  cancelCountdown();stopTimer();roundReady=false;locked=false;
  $('roundLabel').textContent=`ROUND ${roundIndex+1} / ${ROUND_COUNT}`;
  $('promptText').textContent=dailyPrompts[roundIndex].text;
  $('songSearch').value='';clearCorrection();$('songSearch').disabled=true;$('submitBtn').disabled=true;
  $('feedback').textContent='';$('feedback').className='feedback';
  $('progressBar').style.width=`${roundIndex/ROUND_COUNT*100}%`;
  $('timer').textContent=ROUND_SECONDS;$('timerWrap').classList.remove('danger');
  showScreen('game');
  const card=$('questionCard'),countdown=$('roundCountdown'),number=$('roundCountdownNumber');
  card.classList.remove('question-arriving','question-ready');
  void card.offsetWidth;card.classList.add('question-arriving');
  countdown.classList.remove('hidden');
  const token=countdownToken;
  let count=3;
  function step(){
    if(token!==countdownToken)return;
    if(count>=1){
      number.textContent=String(count);
      number.classList.remove('count-pop');void number.offsetWidth;number.classList.add('count-pop');
      count--;countdownHandle=setTimeout(step,1000);return;
    }
    countdown.classList.add('hidden');countdownHandle=null;
    card.classList.remove('question-arriving');card.classList.add('question-ready');
    roundReady=true;$('songSearch').disabled=false;$('submitBtn').disabled=false;
    deadline=performance.now()+ROUND_SECONDS*1000;updateTimer();timer=setInterval(updateTimer,100);
    $('songSearch').focus({preventScroll:true});
  }
  step();
}
function feedback(text){$('feedback').textContent=text;$('feedback').className='feedback';$('songSearch').select();playTone('wrong');}
function tryGuess(){
  if(locked||!roundReady)return;
  if(performance.now()>=deadline){expireRound();return;}
  const input=$('songSearch').value.trim();
  if(!input){feedback('The mic is on! Type a song first.');return;}
  // A second Enter locks the suggestion, but the timer never pauses.
  if(pendingCorrection && normalize(input)===normalize(pendingCorrection.title)){
    const song=pendingCorrection;clearCorrection();
    if(usedSong(song)){feedback('You already played that song! Try another.');return;}
    finishRound(song,false);return;
  }
  clearCorrection();
  const song=findSong(input,dailyPrompts[roundIndex]);
  if(song){
    if(!dailyPrompts[roundIndex].test(song)){feedback('Great song, wrong gig! Try again.');return;}
    if(usedSong(song)){feedback('That song is already in your setlist! Try another.');return;}
    finishRound(song,false);return;
  }
  const suggestion=findCorrection(input,dailyPrompts[roundIndex]);
  if(suggestion){
    if(usedSong(suggestion)){feedback('You already used that song! Try another.');return;}
    pendingCorrection=suggestion;$('songSearch').value=suggestion.title;
    $('feedback').textContent='🎵 Was this the song caught in your head? Press Enter again to lock it in.';
    $('feedback').className='feedback good';$('songSearch').focus({preventScroll:true});
    $('songSearch').setSelectionRange(suggestion.title.length,suggestion.title.length);
    return;
  }
  feedback("That title isn't in this prompt's catalog yet. Try another!");
}
function expireRound(){
  if(locked)return;
  // A valid suggestion already placed in the box counts when the clock expires.
  const song=pendingCorrection && normalize($('songSearch').value)===normalize(pendingCorrection.title)
    && !usedSong(pendingCorrection) ? pendingCorrection : null;
  clearCorrection();finishRound(song,true);
}
function finishRound(song,expired){if(locked)return;locked=true;roundReady=false;stopTimer();const prompt=dailyPrompts[roundIndex];const {points,tier}=scoreFor(song,prompt);totalScore+=points;
history.push({prompt:prompt.text,song:song?`${song.title} — ${song.artist}`:'No correct answer',songKey:song?normalize(`${song.title} ${song.artist}`):null,points,tier});
clearCorrection();$('songSearch').disabled=true;$('submitBtn').disabled=true;$('resultIcon').textContent=points?'♫':'×';$('resultEyebrow').textContent=expired?(song?'SAVED AT THE BUZZER':"TIME'S UP"):'ANSWER LOCKED';
$('resultTitle').textContent=song?song.title:"Time's up!";$('resultArtist').textContent=song?song.artist:'The clock won this round.';
$('tierLabel').textContent=tier==='ULTRA RARE'?'HEADLINER · 90':tier;$('points').textContent=points;$('scoreCard').dataset.tier=tier;
$('resultMessage').textContent=points?`${points} points! Nice pull from the record collection.`:'No points this time. The next track is yours.';
$('continueBtn').innerHTML=roundIndex===ROUND_COUNT-1?'See your music identity <span>→</span>':'Next round <span>→</span>';
showScreen('result');if(points){playRarity(points);celebrate(points);}else playTone('wrong');}
function nextRound(){cancelCountdown();clearCelebration();roundIndex++;if(roundIndex>=ROUND_COUNT)showFinal();else startRound();}
function showFinal(){stopTimer();$('finalScore').textContent=totalScore;const rank=ranks.find(r=>totalScore<=r.max)||ranks.at(-1);
$('rankName').textContent=rank.name;$('rankDescription').textContent=rank.description;$('finalMessage').textContent='Your seven-song set is in the books. Ready to explore the setlist?';
const list=$('finalList');list.replaceChildren();history.forEach((h,i)=>{const row=document.createElement('div');row.className='final-row';const info=document.createElement('div');const title=document.createElement('strong');title.textContent=`${i+1}. ${h.song}`;const detail=document.createElement('small');detail.textContent=h.prompt;info.append(title,detail);const pts=document.createElement('b');pts.textContent=`+${h.points}`;pts.style.color=h.points>=90?'var(--ultra)':h.points>=65?'var(--rare)':h.points>=40?'var(--uncommon)':'var(--common)';row.append(info,pts);list.append(row);});
const select=$('roundFilter');select.replaceChildren();dailyPrompts.forEach((p,i)=>{const opt=document.createElement('option');opt.value=String(i);opt.textContent=`Round ${i+1}: ${p.text}`;select.append(opt);});select.value='0';filterTier='ALL';$('answerSearch').value='';updateFilterButtons();renderAnswers();showScreen('final');playTone('final');}
function updateFilterButtons(){document.querySelectorAll('[data-tier]').forEach(b=>{if(b.closest('#tierFilters'))b.classList.toggle('active',b.dataset.tier===filterTier);});}
function renderAnswers(){const idx=Number($('roundFilter').value)||0,prompt=dailyPrompts[idx];if(!prompt)return;
const query=normalize($('answerSearch').value);const matches=songs.filter(s=>prompt.test(s)).map(s=>({...s,score:scoreFor(s,prompt)})).filter(s=>(filterTier==='ALL'||s.score.tier===filterTier)&&(!query||normalize(`${s.title} ${s.artist}`).includes(query))).sort((a,b)=>b.score.points-a.score.points||a.title.localeCompare(b.title));
$('answerCount').textContent=`${matches.length} matching song${matches.length===1?'':'s'} in our curated catalog · Rarity is editorial, not based on stream counts.`;
const list=$('answerList');list.replaceChildren();if(!matches.length){const p=document.createElement('p');p.className='answer-count';p.textContent='No matches in this filter. Try another.';list.append(p);return;}
for(const s of matches){const row=document.createElement('div');row.className='answer-row';const info=document.createElement('div');const title=document.createElement('strong');title.textContent=s.title;const artist=document.createElement('small');artist.textContent=`${s.artist} · ${s.genre.toUpperCase()}`;info.append(title,artist);const badge=document.createElement('span');badge.className='tier-chip';badge.dataset.tier=s.score.tier;badge.textContent=`${s.score.points} PTS`;row.append(info,badge);list.append(row);}}
// All audio is synthesized locally with Web Audio: no licensed recordings or downloads.
function ensureAudio(){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return false;audioContext??=new AC();if(audioContext.state==='suspended')audioContext.resume();if(!masterGain){masterGain=audioContext.createGain();masterGain.gain.value=.55;masterGain.connect(audioContext.destination);}return true;}
function synth(freq,when,duration=.2,volume=.06,type='sine',destination=null){if(!audioContext)return;const osc=audioContext.createOscillator(),env=audioContext.createGain();osc.type=type;osc.frequency.setValueAtTime(freq,when);env.gain.setValueAtTime(.0001,when);env.gain.exponentialRampToValueAtTime(Math.max(.0002,volume),when+.018);env.gain.exponentialRampToValueAtTime(.0001,when+duration);osc.connect(env).connect(destination||masterGain);osc.start(when);osc.stop(when+duration+.02);}
function playTone(kind){if(!soundEnabled||!ensureAudio())return;const t=audioContext.currentTime+.015;const notes=kind==='final'?[392,494,587,784,988]:kind==='wrong'?[230,196]:[440,554,659];notes.forEach((f,i)=>synth(f,t+i*.11,kind==='final'?.48:.17,kind==='wrong'?.022:.075,kind==='wrong'?'triangle':'sine'));}
function playRarity(points){if(!soundEnabled||!ensureAudio())return;const t=audioContext.currentTime+.02;const settings={25:{notes:[392,494],vol:.035,dur:.19,type:'sine',gap:.15},40:{notes:[392,494,587],vol:.057,dur:.26,type:'sine',gap:.13},65:{notes:[392,523,659,784],vol:.08,dur:.4,type:'triangle',gap:.12},90:{notes:[262,392,523,659,784,1047],vol:.095,dur:.64,type:'triangle',gap:.11}};const v=settings[points]||settings[25];v.notes.forEach((f,i)=>{synth(f,t+i*v.gap,v.dur,v.vol,v.type);if(points>=65)synth(f*2,t+i*v.gap+.055,v.dur*.8,v.vol*.26,'sine');});if(points===90){synth(131,t,.8,.09,'sine');synth(196,t+.17,.7,.06,'triangle');}}
// Soft, original generative loop: a repeating chord bed and a gentle melodic pulse.
const chords=[[220,261.63,329.63],[174.61,220,261.63],[196,246.94,293.66],[164.81,196,246.94]];
function musicTick(){if(!soundEnabled||!audioContext||audioContext.state!=='running')return;const t=audioContext.currentTime+.035;const chord=chords[Math.floor(musicStep/4)%chords.length];if(musicStep%4===0){chord.forEach((f,i)=>synth(f,t,2.8,.012,'sine'));synth(chord[0]/2,t,1.4,.025,'triangle');}const melody=[0,2,1,2,0,1,2,1][musicStep%8];synth(chord[melody]*2,t,.22,.011,'sine');musicStep++;}
function startMusic(){if(!soundEnabled||!ensureAudio())return;stopMusic();musicTick();musicLoop=setInterval(musicTick,650);document.body.classList.add('music-on');}
function stopMusic(){if(musicLoop!==null){clearInterval(musicLoop);musicLoop=null;}document.body.classList.remove('music-on');}
// SongDive 2.4: every celebration restarts its own wave, even on repeated tiers.
let celebrationCleanup=null, celebrationToken=0, vinylFrame=null, vinylBoost=1;
function updateVinylSpeed(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const animations=[...document.querySelectorAll('.vinyl')].flatMap(el=>el.getAnimations()).filter(a=>a.effect);
  for(const animation of animations)animation.playbackRate=vinylBoost;
}
function spinRecords(points){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const target=({25:1.6,40:2.8,65:5,90:9})[points]||1;
  if(vinylFrame!==null)cancelAnimationFrame(vinylFrame);
  const started=performance.now(),start=vinylBoost;
  function animate(now){
    const elapsed=now-started;
    // Fast acceleration followed by a leisurely five-second coast back to idle.
    const desired=elapsed<380?start+(target-start)*(1-Math.pow(1-elapsed/380,3)):
      1+(target-1)*Math.pow(Math.max(0,1-(elapsed-380)/5400),2);
    vinylBoost=Math.max(1,desired);updateVinylSpeed();
    if(elapsed<5780)vinylFrame=requestAnimationFrame(animate);
    else{vinylBoost=1;updateVinylSpeed();vinylFrame=null;}
  }
  vinylFrame=requestAnimationFrame(animate);
}
function igniteVinyl(tier,duration){
  const colors={common:['#d6dce9','#9da9bc'],uncommon:['#72ffac','#d6ff9b'],rare:['#c99cff','#8d55ff'],headliner:['#ffe78d','#ff9e36']}[tier];
  document.querySelectorAll('.vinyl-fire').forEach((fire,recordIndex)=>{
    fire.replaceChildren();
    const count={common:9,uncommon:20,rare:30,headliner:46}[tier];
    for(let i=0;i<count;i++){
      const spark=document.createElement('i');spark.className='vinyl-spark';
      const angle=Math.random()*Math.PI*2;
      const radius=45+Math.random()*6;
      spark.style.left=`${50+Math.cos(angle)*radius}%`;
      spark.style.top=`${50+Math.sin(angle)*radius}%`;
      spark.style.background=colors[i%colors.length];
      spark.style.setProperty('--sx',`${Math.cos(angle)*(15+Math.random()*55)}px`);
      spark.style.setProperty('--sy',`${Math.sin(angle)*(15+Math.random()*55)}px`);
      spark.style.setProperty('--spark-delay',`${Math.random()*1.5}s`);
      spark.style.setProperty('--spark-life',`${1+Math.random()*1.7}s`);
      fire.append(spark);
    }
  });
}
function clearCelebration(){
  celebrationToken++;
  if(celebrationCleanup!==null){clearTimeout(celebrationCleanup);celebrationCleanup=null;}
  document.body.classList.remove('celebrate-common','celebrate-uncommon','celebrate-rare','celebrate-headliner');
  const layer=$('celebration');layer.className='celebration';layer.replaceChildren();
  document.querySelectorAll('.vinyl-fire').forEach(el=>el.replaceChildren());
  $('revealOverlay').className='reveal-overlay';
}
function celebrate(points){
  clearCelebration();spinRecords(points);
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const token=celebrationToken;
  const tier=points===90?'headliner':points===65?'rare':points===40?'uncommon':'common';
  const duration={common:3600,uncommon:4700,rare:7000,headliner:8500}[tier];
  const layer=$('celebration');
  // A newly created ring element is guaranteed to start a fresh animation.
  layer.className=`celebration effect-${tier}`;
  const rippleCount=tier==='rare'||tier==='headliner'?1:0;
  for(let r=0;r<rippleCount;r++){
    const ring=document.createElement('div');ring.className=`cinema-ring cinema-${tier}`;
    ring.style.setProperty('--ring-delay',`${r*(tier==='rare'?.52:.44)}s`);
    layer.append(ring);
  }
  document.body.classList.add(`celebrate-${tier}`);
  igniteVinyl(tier,duration);
  if(tier==='headliner'){
    $('revealName').textContent='HEADLINER';$('revealPoints').textContent='+90';
    $('revealOverlay').className='reveal-overlay';void $('revealOverlay').offsetWidth;
    $('revealOverlay').className='reveal-overlay reveal-active';
  }
  const count={common:32,uncommon:150,rare:165,headliner:300}[tier];
  const colors={common:['#e4e8ff','#aeb8ce'],uncommon:['#70ffac','#e4ff9b','#6df6ec'],rare:['#bba1ff','#e8caff','#fff7db','#80f1ff'],headliner:['#ffe36e','#fff6c1','#ffb83d','#f886de','#8ffaff']}[tier];
  for(let i=0;i<count;i++){
    const p=document.createElement('i');p.className=`fx-piece fx-${tier}`;p.style.background=colors[i%colors.length];
    const angle=Math.random()*Math.PI*2;
    const distance=(tier==='headliner'?120:tier==='rare'?90:45)+Math.random()*(tier==='headliner'?650:tier==='rare'?480:340);
    p.style.setProperty('--dx',`${Math.cos(angle)*distance}px`);p.style.setProperty('--dy',`${Math.sin(angle)*distance}px`);
    p.style.setProperty('--turn',`${(Math.random()-.5)*1300}deg`);
    p.style.setProperty('--delay',`${Math.random()*(tier==='headliner'?.65:.38)}s`);
    p.style.setProperty('--life',`${(duration/1000)*(.58+Math.random()*.36)}s`);
    p.style.setProperty('--size',`${tier==='common'?3+Math.random()*5:5+Math.random()*11}px`);
    if(tier==='uncommon'){
      p.style.left=`${15+Math.random()*70}%`;p.style.top=`${-8-Math.random()*25}%`;
      p.style.setProperty('--dx',`${(Math.random()-.5)*230}px`);
      p.style.setProperty('--dy',`${window.innerHeight*(.9+Math.random()*.6)}px`);
    }else{p.style.left=`${47+Math.random()*6}%`;p.style.top=`${40+Math.random()*13}%`;}
    layer.append(p);
  }
  celebrationCleanup=setTimeout(()=>{
    if(token!==celebrationToken)return;
    layer.classList.add('effect-dissolving');
    document.body.classList.remove('celebrate-common','celebrate-uncommon','celebrate-rare','celebrate-headliner');
    celebrationCleanup=setTimeout(()=>{
      if(token!==celebrationToken)return;
      layer.replaceChildren();layer.className='celebration';$('revealOverlay').className='reveal-overlay';celebrationCleanup=null;
    },3000);
  },duration-2000);
}
async function shareScore(){const rank=ranks.find(r=>totalScore<=r.max)||ranks.at(-1);const message=`🎵 SongDive 3.0 Daily Seven\n${rank.name}\n${totalScore}/${MAX_SCORE} points\nhttps://cocopuffers.github.io/Songdive/`;try{if(navigator.share){await navigator.share({text:message});return;}await navigator.clipboard.writeText(message);$('shareBtn').textContent='Copied to clipboard!';}catch(e){if(e.name!=='AbortError')window.prompt('Copy your score:',message);}}
$('songSearch').addEventListener('input',()=>{if(pendingCorrection){clearCorrection();$('feedback').textContent='';$('feedback').className='feedback';}});
$('startBtn').addEventListener('click',startGame);$('guessForm').addEventListener('submit',e=>{e.preventDefault();tryGuess();});$('continueBtn').addEventListener('click',nextRound);$('restartBtn').addEventListener('click',startGame);$('shareBtn').addEventListener('click',shareScore);
$('roundFilter').addEventListener('change',renderAnswers);$('answerSearch').addEventListener('input',renderAnswers);$('tierFilters').addEventListener('click',e=>{const button=e.target.closest('button[data-tier]');if(!button)return;filterTier=button.dataset.tier;updateFilterButtons();renderAnswers();});
$('soundBtn').addEventListener('click',()=>{soundEnabled=!soundEnabled;$('soundBtn').textContent=soundEnabled?'♫ ON':'♫ OFF';$('soundBtn').setAttribute('aria-pressed',String(soundEnabled));if(soundEnabled){startMusic();playTone('win');}else stopMusic();});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopMusic();else if(soundEnabled)startMusic();});
$('homeLink').addEventListener('click',e=>{e.preventDefault();if(!confirm('Return to the home screen? Your current run will be lost.'))return;cancelCountdown();stopTimer();clearCelebration();showScreen('intro');});
showScreen('intro');
