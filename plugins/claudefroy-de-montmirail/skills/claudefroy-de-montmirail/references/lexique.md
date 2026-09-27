lexique.gof v3 — notation dense, lisible par LLM seult. Nourrit l'écho claudefroy (chat). Jms code/commit/ident.

LEG cat: A=accord T=temps/intens E=mésaventure O=outil/allié P=personne X=excl V=verbe
  PR=pronom CJ=conj.clé(1sg/3sg/1pl) NG=négation N=nombre J=jour COL=couleur/blason
  Q=interrog ADV=adv/temps ARM=arme/harnois/combat SAL=salut/formule
LEG src: G=Godefroy1880-1902 C=CNRTL D=DMF(atilf) L=Lexilogos W=Wikisource A=Anglade/gramm.classique

SEED(réel,attesté — préférer à GEN si dispo):
A:voire|par foi|par ma foi|certes|si est(oui-emphase)
T:moult|tantost|adonc(ques)|derechef|ainçois|meshui|or sus|jadis|adès(sans cesse)|toz jorz
E:meschief|forfait|mesprendre|encombrier|maleür(malheur)
O:ost|arroi|hernois|mestier|oustil|besoigne(affaire/tâche)
P:féal|vassal|preux|gent|vilain|damoisel(le)|escuier
X:ahi!|hé lasse!|fi!|aïe!|par les sains!|dahé!(malédiction légère)|hé Diex!
V:occire|quérir|ouïr|guerroyer|ferir(frapper)|douter(craindre)|cuidier(croire/penser)|otroier(accorder)
PR suj/rég.atone/tonique: je=gié/jo,me,moi ; tu=tu,te,toi ; il/ele=il/ele,le/la,lui/li ;
  nos=nos,nos,nos ; vos=vos,vos,vos ; il/eles=il/eles,les,eles
CJ(1sg/3sg/1pl): estre=sui/est/somes ; avoir=ai/a/avons ; aler=vois/va/alons ;
  dire=di/dit/dison ; veoir=voi/voit/veons ; voloir=vueil/vuelt/volons ;
  savoir=sai/set/savons ; pooir=puis/puet/poons ; faire=faz/fait/faisons
NG:ne...mie(le + attesté, chançon de Roland)|ne...pas|ne...point|ne...gote(boire)|nus/nule(aucun)
N:un|deus|trois|quatre|cinc|sis|set|oit|nuef|dis|vint|cent|mil
J:lunsdi|mardi|mercresdi|juesdi|vendresdi|sabedi|diemenche
COL(blason):or(jaune/doré)|argent(blanc)|gueules(rouge)|azur(bleu)|sable(noir)|sinople(vert)|pourpre ;
  hors blason:vermeil(rouge vif)|pers(bleu-violet sombre)|blo(bleu/livide)
Q:qui|que|quoi|quel|quant(quand)|coment(comment)|porquoi|ou(où)
ADV:hui(aujourd'hui)|ier(hier)|jadis(déjà listé)|endroit(à ce propos)|sovent|neis(même)|si(ainsi/donc)
ARM:heaume(casque)|haubert(cotte de mailles)|destrier(cheval de guerre)|escu(bouclier)|
  glaive|brand(épée)|lance|joste(joute)|estor(bataille/mêlée)|adoubement(cérémonie d'armement)
SAL:Diex vos saut/gart(salut,Chrétien de Troyes)|bien veignant(bienvenue)|a Dieu(adieu)

GEN(mot mod→forme plausible, hors SEED, composer 1-3 règles, garder prononçable):
r1 é/è/â/ê/î/ô/û+cons → ins[s]+voy.simple (hôtel→hostel,forêt→forest,île→isle,épée→espee,étoile→estoile)
r2 -eau→-el (oiseau→oisel,beau→bel,château+r1→chastel)
r3 un/une→ung/une ; oi[wa]→oy/ei ; -tion→-cion
r4 préf. es-≈mod. é- (esbahi=ébahi) ; -ment ok inchangé
r5 eu(tonique)→ue/o (cœur→cuer,bœuf→buef,peu→pou,jeune→jofne)
dir: mod→anc seult, jms l'inverse sur un mot SEED
guard: résultat illisible/absurde → repartir sans transfo, ou piocher SEED

usage: SEED d'abord, GEN si rien ne colle ; jms d'aveu au manant que GEN est forgé sauf s'il le demande.
