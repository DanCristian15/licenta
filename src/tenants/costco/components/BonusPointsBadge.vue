<template>
    <div>
        <GoldStarSvg
            class="bonus-point-badge__gold-card" />
        <ExecClubAssetSvg
            class="bonus-point-badge__exec-card" />
    </div>
</template>

<script>
    import ExecClubAssetSvg from '@tenants/costco/assets/executive-card.svg';
    import GoldStarSvg from '@tenants/costco/assets/goldstar-card.svg';

    export default {
        components: { 
            ExecClubAssetSvg,
            GoldStarSvg
        },
        props: {
            cardHeight: {
                type: Number,
                default: 200
            },
            cardWidth: {
                type: Number,
                default: 100
            }
        },
    };
</script>

<style lang="scss">
    .bonus-point-badge__exec-card {
        position: absolute;
        left: 0;
        bottom: 0;
        height: 70%;
        width: 68%;

        .exec-cls-1,
        .exec-cls-5 { fill: none; }
        .exec-cls-2 { clip-path: url( #exec-clip-path ); }
        .exec-cls-3 { fill: url( #exec-linear-gradient ); }
        .exec-cls-4 { fill: #F9EA97; }

        .exec-cls-5 {
            stroke-width: 1.5px;
            stroke: #272525;
        }
        .exec-cls-6 { fill: #272525; }
        .exec-cls-7 { fill: #FFFFFF; }
        .exec-cls-8 { fill: #0033A0; }
        .exec-cls-9 { fill: #C8102E; }
    }

    .bonus-point-badge__gold-card {
        position: absolute;
        top: 0;
        right: 0;
        height: 70%;
        max-width: 68%;

        .cls-1 { fill: #0E0E0E; }
        .cls-2 { fill: #191919; }
        .cls-3 { fill: #EAE9E8; }
        .cls-4 { fill: #F9F8F8; }
        .cls-5 { fill: #4C4A4A; }
        .cls-6 { fill: #19191A; }
        .cls-7 { fill: #1F4262; }
        .cls-8 { fill: #FFFFFF; }
        .cls-9 { fill: #1D599F; }
        .cls-10 { fill: #18181A; }
        .cls-11 { fill: #1D5BA1; }
        .cls-12 { fill: #F7A71C; }
        .cls-13 { fill: #DD202F; }
        .cls-14 { fill: #04559F; }
        .cls-15 { fill: #04549F; }
        .cls-16 { fill: #02559F; }
        .cls-17 { fill: #1A539B; }
        .cls-18 { fill: #DD212D; }
        .cls-19 { fill: #DD212E; }
        .cls-20 { fill: #DD222D; }
        .cls-21 { fill: #194892; }
        .cls-22 { fill: #DD222E; }
        .cls-23 { fill: #DD232E; }
        .cls-24 { fill: #DE212E; }
        .cls-25 { fill: #DE222E; }
        .cls-26 { fill: #DE222D; }
        .cls-27 { fill: #DD242D; }
        .cls-28 { fill: #DD252E; }
        .cls-29 { fill: #DD232B; }
        .cls-30 { fill: #DD252C; }
        .cls-31 { fill: #DE232F; }
        .cls-32 { fill: #DC272E; }
        .cls-33 { fill: #DC252D; }
        .cls-34 { fill: #DE2933; }
        .cls-35 { fill: #0E539D; }
        .cls-36 { fill: #2A5EA1; }
        .cls-37 { fill: #DD262F; }
        .cls-38 { fill: #DE2730; }
        .cls-39 { fill: #DD272F; }
        .cls-40 { fill: #0B519C; }
        .cls-41 { fill: #EE939F; }
        .cls-42 { fill: #06519B; }
        .cls-43 { fill: #1E5AA1; }
        .cls-44 { fill: #F0A0A6; }
        .cls-45 { fill: #F1979F; }
        .cls-46 { fill: #DF3238; }
        .cls-47 { fill: #1B549E; }
        .cls-48 { fill: #F09BA6; }
        .cls-49 { fill: #1F5AA0; }
        .cls-50 { fill: #DD252D; }
        .cls-51 { fill: #DD2930; }
        .cls-52 { fill: #14559D; }
        .cls-53 { fill: #E13C4F; }
        .cls-54 { fill: #DD242F; }
        .cls-55 { fill: #E65D6B; }
        .cls-56 { fill: #DF3036; }
        .cls-57 { fill: #DD2A30; }
        .cls-58 { fill: #DE2932; }
        .cls-59 { fill: #DE2F37; }
        .cls-60 { fill: #EB6677; }
        .cls-61 { fill: #E4384B; }
        .cls-62 { fill: #DD3236; }
        .cls-63 { fill: #DE2B32; }
        .cls-64 { fill: #DD282E; }
        .cls-65 { fill: #1A5AA0; }
        .cls-66 { fill: #DE232E; }
        .cls-67 { fill: #20599F; }
        .cls-68 { fill: #76A2D1; }
        .cls-69 { fill: #5B91C4; }
        .cls-70 { fill: #DE2831; }
        .cls-71 { fill: #DD2A35; }
        .cls-72 { fill: #DF3638; }
        .cls-73 { fill: #DD2830; }
        .cls-74 { fill: #DE2C34; }
        .cls-75 { fill: #DD2C33; }
        .cls-76 { fill: #DC222B; }
        .cls-77 { fill: #DC272F; }
        .cls-78 { fill: #DF3739; }
        .cls-79 { fill: #E03F48; }
        .cls-80 { fill: #F0ADB4; }
        .cls-81 { fill: #DE2C35; }
        .cls-82 { fill: #EC98A1; }
        .cls-83 { fill: #E43F4F; }
        .cls-84 { fill: #4780B8; }
        .cls-85 { fill: #DC2B33; }
        .cls-86 { fill: #DD2A31; }
        .cls-87 { fill: #2D61A5; }
        .cls-88 { fill: #DD2931; }
        .cls-89 { fill: #D92127; }
        .cls-90 { fill: #1A5299; }
        .cls-91 { fill: #4079B4; }
        .cls-92 { fill: #9CBCDA; }
        .cls-93 { fill: #DC2128; }
        .cls-94 { fill: #18529A; }
        .cls-95 { fill: #2960A3; }
        .cls-96 { fill: #DD2A32; }
        .cls-97 { fill: #DE2C33; }
        .cls-98 { fill: #97BAD9; }
        .cls-99 { fill: #DD2831; }
        .cls-100 { fill: #DD212A; }
        .cls-101 { fill: #9CBDDC; }
        .cls-102 { fill: #DC2932; }
        .cls-103 { fill: #DD2932; }
        .cls-104 { fill: #DE2931; }
        .cls-105 { fill: #91B5D9; }
        .cls-106 { fill: #4D80B6; }
        .cls-107 { fill: #E03438; }
        .cls-108 { fill: #DD2E33; }
        .cls-109 { fill: #E04141; }
        .cls-110 { fill: #DF3C3E; }
        .cls-111 { fill: #12529B; }
        .cls-112 { fill: #15569E; }
        .cls-113 { fill: #DD2B31; }
        .cls-114 { fill: #E13A4E; }
        .cls-115 { fill: #DF2830; }
        .cls-116 { fill: #DE282F; }
        .cls-117 { fill: #E22741; }
        .cls-118 { fill: #DD212F; }
        .cls-119 { fill: #DD222F; }
        .cls-120 { fill: #FEFBF7; }
        .cls-121 { fill: #DD242E; }
        .cls-122 { fill: #DD232D; }
        .cls-123 { fill: #DD202E; }
        .cls-124 { fill: #DE2630; }
        .cls-125 { fill: #DD272D; }
        .cls-126 { fill: #DD222A; }
        .cls-127 { fill: #DD272E; }
        .cls-128 { fill: #DD232C; }
        .cls-129 { fill: #DE2A32; }
        .cls-130 { fill: #DE212F; }
        .cls-131 { fill: #DE2732; }
        .cls-132 { fill: #F7D9DE; }
        .cls-133 { fill: #DF3636; }
        .cls-134 { fill: #DE2830; }
        .cls-135 { fill: #DF3137; }
        .cls-136 { fill: #DC212B; }
        .cls-137 { fill: #DF2C35; }
        .cls-138 { fill: #DD2532; }
        .cls-139 { fill: #DE2F34; }
        .cls-140 { fill: #DE263F; }
        .cls-141 { fill: #E03246; }
        .cls-142 { fill: #DD252F; }
        .cls-143 { fill: #F7CED0; }
        .cls-144 { fill: #DE2330; }
        .cls-145 { fill: #EF9CA6; }
        .cls-146 { fill: #DF2A36; }
        .cls-147 { fill: #DA2127; }
        .cls-148 { fill: #DF2834; }
        .cls-149 { fill: #DE2D32; }
        .cls-150 { fill: #DD2C32; }
        .cls-151 { fill: #DF2D36; }
        .cls-152 { fill: #DE3037; }
        .cls-153 { fill: #DF2632; }
        .cls-154 { fill: #DE2532; }
        .cls-155 { fill: #DB212A; }
        .cls-156 { fill: #DF3837; }
        .cls-157 { fill: #DF353A; }
        .cls-158 { fill: #DF2D33; }
        .cls-159 { fill: #F4D177; }
        .cls-160 { fill: #0859A6; }
        .cls-161 { fill: #0555A0; }
        .cls-162 { fill: #125CAB; }
        .cls-163 { fill: #085098; }
        .cls-164 { fill: #DD1F3D; }
        .cls-165 { fill: #E74C4E; }
        .cls-166 { fill: #E03433; }
        .cls-167 { fill: #F7A11E; }
        .cls-168 { fill: #E64828; }
        .cls-169 { fill: #DE3136; }
        .cls-170 { fill: #DF2C3C; }
        .cls-171 { fill: #E0313C; }
        .cls-172 { fill: #F5B21B; }
        .cls-173 { fill: #F7B51A; }
        .cls-174 { fill: #DF233C; }
        .cls-175 { fill: #E6364D; }
        .cls-176 { fill: #F7951E; }
        .cls-177 { fill: #E0293E; }
        .cls-178 { fill: #E2352F; }
        .cls-179 { fill: #F7B519; }
        .cls-180 { fill: #F7B819; }
        .cls-181 { fill: #F8B619; }
        .cls-182 { fill: #E23451; }
        .cls-183 { fill: #EF8027; }
        .cls-184 { fill: #E13442; }
        .cls-185 { fill: #E22243; }
        .cls-186 { fill: #DC2127; }
        .cls-187 { fill: #DA2128; }
        .cls-188 { fill: #D92128; }
        .cls-189 { fill: #DE2126; }
        .cls-190 { fill: #DB2127; }
        .cls-191 { fill: #FBFCFD; }
        .cls-192 { fill: #15529C; }
        .cls-193 { fill: #154D9A; }
        .cls-194 { fill: #3D7EB8; }
        .cls-195 { fill: #0F4E97; }
        .cls-196 { fill: #144F99; }
        .cls-197 { fill: #0A4F99; }
        .cls-198 { fill: #3F7EB8; }
        .cls-199 { fill: #164A95; }
        .cls-200 { fill: #184996; }
        .cls-201 { fill: #164A92; }
        .cls-202 { fill: #184995; }
        .cls-203 { fill: #174A93; }
        .cls-204 { fill: #DE2127; }
        .cls-205 { fill: #DC212A; }
        .cls-206 { fill: #D72128; }
        .cls-207 { fill: #D1DBEB; }
        .cls-208 { fill: #084F9B; }
        .cls-209 { fill: #16509B; }
        .cls-210 { fill: #07509B; }
        .cls-211 { fill: #2A6FB2; }
        .cls-212 { fill: #194992; }
        .cls-213 { fill: #1A4890; }
        .cls-214 { fill: #144B97; }
        .cls-215 { fill: #105FA9; }
        .cls-216 { fill: #216DAA; }
        .cls-217 { fill: #1A4892; }
        .cls-218 { fill: #055199; }
        .cls-219 { fill: #0653A0; }
        .cls-220 { fill: #02559C; }
        .cls-221 { fill: #0956A3; }
        .cls-222 { fill: #1E5096; }
        .cls-223 { fill: #174997; }
        .cls-224 { fill: #09509B; }
        .cls-225 { fill: #1A4891; }
        .cls-226 { fill: #104E97; }
        .cls-227 { fill: #174A96; }
        .cls-228 { fill: #164A97; }
        .cls-229 { fill: #0554A0; }
        .cls-230 { fill: #1A488F; }
        .cls-231 { fill: #144B98; }
        .cls-232 { fill: #06549C; }
        .cls-233 { fill: #D42127; }
        .cls-234 { fill: #F5C1C5; }
        .cls-235 { fill: #F1ABB0; }
        .cls-236 { fill: #E76578; }
        .cls-237 { fill: #EB5E6F; }
        .cls-238 { fill: #EA6F7C; }
        .cls-239 { fill: #FCEFED; }
        .cls-240 { fill: #DD2127; }
        .cls-241 { fill: #DE2D36; }
        .cls-242 { fill: #FDF1EF; }
        .cls-243 { fill: #FBEAE7; }
        .cls-244 { fill: #DE2129; }
        .cls-245 { fill: #DE343A; }
        .cls-246 { fill: #DF2831; }
        .cls-247 { fill: #E24347; }
        .cls-248 { fill: #DC2129; }
        .cls-249 { fill: #DE2331; }
        .cls-250 { fill: #FEF9F8; }
        .cls-251 { fill: #DE3337; }
        .cls-252 { fill: #D82127; }
        .cls-253 { fill: #DD2129; }
        .cls-254 { fill: #DE3733; }
        .cls-255 { fill: #FEFCFC; }
        .cls-256 { fill: #DE3236; }
        .cls-257 { fill: #DE2031; }
        .cls-258 { fill: #DC222A; }
        .cls-259 { fill: #DE2531; }
        .cls-260 { fill: #F8B81B; }
        .cls-261 { fill: #E02942; }
        .cls-262 { fill: #F8B91A; }
        .cls-263 { fill: #DD202A; }
        .cls-264 { fill: #DD262B; }
        .cls-265 { fill: #E7434D; }
        .cls-266 { fill: #E43B4A; }
        .cls-267 { fill: #E6505C; }
        .cls-268 { fill: #F8F6FA; }
        .cls-269 { fill: #F4B7C0; }
    }
</style>
