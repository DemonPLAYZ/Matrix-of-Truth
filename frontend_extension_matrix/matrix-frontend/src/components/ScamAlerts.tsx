import { useState } from "react";
import { motion } from "framer-motion";

interface ScamAlert {
  title: string;
  description: string;
  category: string;
  severity: string;
  warning: string;
  url: string;
  source: string;
}

const HARDCODED_SCAMS: ScamAlert[] = [
  {
    title: "FBI IC3 Impersonation Scam",
    description: "Scammers spoof the FBI's Internet Crime Complaint Center (IC3) site and impersonate IC3 staff, steering victims to fake '.gov-like' pages or outreach promising recovery if they pay fees or share sensitive data. Over 100 reports received between Dec 2023-Feb 2025.",
    category: "Authority Impersonation",
    severity: "High",
    warning: "Type ic3.gov directly in the address bar; avoid 'sponsored' search results and never pay anyone claiming to be the IC3.",
    url: "https://www.ic3.gov/PSA/2025/PSA250418",
    source: "FBI IC3"
  },
  {
    title: "'Phantom Hacker' 3-Phase Scam Drains Billions",
    description: "Starts with fake tech support, escalates to 'bank security,' then a 'government' representative urging victims to move funds to 'safe' accounts. Losses have exceeded $1B since 2024 with seniors heavily targeted.",
    category: "Tech Support Scam",
    severity: "High",
    warning: "Never grant remote access or move money on instruction; contact your bank and the company using verified numbers.",
    url: "https://www.benzinga.com/markets/tech/25/08/47432513/fbi-alerts-public-on-phantom-hacker-scam-that-has-drained-billions-from-bank-accounts",
    source: "Benzinga (FBI Alert)"
  },
  {
    title: "Unsolicited Cash-on-Delivery Parcel Scam",
    description: "Fraudsters send unsolicited COD parcels with low-value items, harvesting addresses and exploiting small payments. Police opened a case in Bengaluru in Oct 2025 after multiple complaints.",
    category: "Delivery Scam",
    severity: "Medium",
    warning: "Don't accept or pay for parcels you didn't order; verify with the supposed sender and courier first.",
    url: "https://www.hindustantimes.com/cities/bengaluru-news/senior-citizen-exposes-online-delivery-scam-after-receiving-fake-cod-parcel-in-bengaluru-report-101761486007767.html",
    source: "Hindustan Times"
  },
  {
    title: "Government Cracks Down on India Parcel Scam Calls",
    description: "Imposters spoof numbers, pose as enforcement officials, claim a parcel in your name has contraband (drugs, fake passports) to coerce money or data. Indian government urged reporting to cybercrime portal in 2024.",
    category: "Authority Impersonation",
    severity: "High",
    warning: "Hang up and verify with the agency on official channels; report calls on the government cybercrime site.",
    url: "https://www.indiatoday.in/technology/news/story/govt-starts-action-against-parcel-scam-urges-citizens-to-report-suspected-calls-on-cyber-crime-website-2543840-2024-05-25",
    source: "India Today"
  },
  {
    title: "DHL Missed-Delivery QR Code Scam",
    description: "Fraudsters leave 'missed delivery' cards with a QR code leading to a phishing site to steal payment and personal info under the guise of fees.",
    category: "Delivery Scam",
    severity: "Medium",
    warning: "Don't scan unexpected QR codes; track packages via the official courier app or website entered manually.",
    url: "https://economictimes.com/wealth/save/dhl-courier-qr-code-scam-fraudsters-demand-payment-for-rescheduled-deliveries-know-all-about-this-new-fraud/articleshow/116533718.cms",
    source: "Economic Times"
  },
  {
    title: "IRS Dirty Dozen 2025: Spear-Phishing and 'New Client' Scams",
    description: "Targeted emails posing as potential clients or the IRS trick tax professionals and taxpayers into opening malware or sharing credentials during filing season and beyond.",
    category: "Tax Scam",
    severity: "High",
    warning: "Verify client leads independently; never click links or attachments from unsolicited IRS- or client-themed messages.",
    url: "https://www.irs.gov/newsroom/dirty-dozen-tax-scams-for-2025-irs-warns-taxpayers-to-watch-out-for-dangerous-threats",
    source: "IRS"
  },
  {
    title: "IRS 2025: Overstated Withholding and Bogus Credit Schemes",
    description: "Social media promoters push fake W-2/1099 entries or false credits to claim large refunds. Refunds are held and filers face penalties and possible prosecution.",
    category: "Tax Scam",
    severity: "High",
    warning: "Only use legitimate wage and withholding documents; ignore social media 'refund hacks'.",
    url: "https://www.irs.gov/newsroom/dirty-dozen-tax-scams-for-2025-irs-warns-taxpayers-to-watch-out-for-dangerous-threats",
    source: "IRS"
  },
  {
    title: "DOJ Seizes $15B in Bitcoin from Pig Butchering Fraud",
    description: "Scammers groom victims over messaging apps to invest via fake platforms. DOJ seized approximately $15B in bitcoin tied to a Cambodia-based operation in 2025.",
    category: "Cryptocurrency Scam",
    severity: "High",
    warning: "No guaranteed returns; verify platforms with regulators and never invest via links from unsolicited contacts.",
    url: "https://www.cnbc.com/2025/10/14/bitcoin-doj-chen-zhi-pig-butchering-scam.html",
    source: "CNBC"
  },
  {
    title: "Treasury/OFAC Sanctions on Pig-Butchering Network",
    description: "U.S. and U.K. imposed sweeping sanctions on 146 targets in the Prince Group TCO linked to forced-labor compounds and crypto investment frauds.",
    category: "Cryptocurrency Scam",
    severity: "High",
    warning: "Check sanctions advisories; refrain from interacting with platforms tied to sanctioned entities.",
    url: "https://home.treasury.gov/news/press-releases/sb0278",
    source: "U.S. Treasury (OFAC)"
  },
  {
    title: "DOJ Indicts Prince Group Leader for Scam Compounds",
    description: "Individuals forced to run pig-butchering crypto scams from compounds. DOJ charged the leader and described the global fraud apparatus.",
    category: "Cryptocurrency Scam",
    severity: "High",
    warning: "Be wary of unsolicited 'advisors' using messaging apps; confirm registration at Investor.gov.",
    url: "https://www.justice.gov/opa/pr/chairman-prince-group-indicted-operating-cambodian-forced-labor-scam-compounds-engaged",
    source: "U.S. Department of Justice"
  },
  {
    title: "FTC: Imposters Posing as the FTC (2025)",
    description: "Scammers claim to be FTC 'agents,' even name senior officials, and urge people to move funds to 'protect' them, or demand fees for 'refunds'.",
    category: "Authority Impersonation",
    severity: "High",
    warning: "The FTC never asks for money, gift cards, crypto, or to move funds; hang up and report at ReportFraud.ftc.gov.",
    url: "https://consumer.ftc.gov/scams",
    source: "FTC Consumer Advice"
  },
  {
    title: "FTC Warning on Fake Social Ads for Brand-Name Goods",
    description: "Fake social media ads impersonate known brands, sending buyers to cloned sites to steal payments and identities. Products never arrive or are counterfeits.",
    category: "Social Media Scam",
    severity: "Medium",
    warning: "Research the seller, compare prices, and use a credit card with dispute protections.",
    url: "https://consumer.ftc.gov/consumer-alerts/2025/08/social-media-ad-super-low-prices-well-known-brands-could-be-scam",
    source: "FTC Consumer Alerts"
  },
  {
    title: "Social Media 'Investment' from Hacked Friend Accounts",
    description: "Scammers hijack friend accounts and DM 'opportunities' with guaranteed returns, asking for crypto or app payments. Victims are blocked after sending funds.",
    category: "Social Media Scam",
    severity: "High",
    warning: "Slow down, research, verify with your friend via separate contact, and report to FTC/SEC.",
    url: "https://consumer.ftc.gov/consumer-alerts/2025/05/can-you-spot-investment-scam-social-media",
    source: "FTC Consumer Advice"
  },
  {
    title: "Tech Support Scams: FTC Returns $25.5M to Victims",
    description: "Companies used scare tactics and deception to sell 'repairs' for non-existent issues. FTC returned $25.5M to consumers and barred misrepresentation.",
    category: "Tech Support Scam",
    severity: "High",
    warning: "Pop-up or cold-call 'security alerts' are red flags; don't call or download from them—use official vendor support.",
    url: "https://www.ftc.gov/news-events/news/press-releases/2025/03/ftc-sends-more-255-million-consumers-impacted-tech-support-firms-scam",
    source: "Federal Trade Commission"
  },
  {
    title: "Zelle Bank-Impostor Phone Scams",
    description: "Fraudsters call or text as 'bank fraud' teams, coaching victims to send 'test' Zelle transfers or read one-time passcodes. Payments are instant and hard to reverse.",
    category: "Payment App Scam",
    severity: "High",
    warning: "Don't send Zelle to unknown recipients; call your bank using the number on your card or app, not caller ID.",
    url: "https://lifelock.norton.com/learn/fraud/zelle-scams",
    source: "Norton LifeLock"
  },
  {
    title: "Bank/Zelle Imposter Script: 'Enter Code' Fraud",
    description: "Callers claim to stop fraud and instruct victims to enter codes or send 'verification' payments via Zelle. Funds are actually transferred to criminals.",
    category: "Payment App Scam",
    severity: "High",
    warning: "Resolve suspected fraud in person or via official bank channels; never follow payment instructions from unsolicited calls.",
    url: "https://oaklandcountyblog.com/2025/11/04/zelle-scam-alert-how-a-fake-call-could-drain-your-bank-account/amp/",
    source: "Oakland County Blog"
  },
  {
    title: "Classic Phishing and Smishing Guidance (Updated 2024)",
    description: "Email/text messages mimic banks, delivery firms, or agencies to harvest credentials, install malware, or coerce payments using urgency and fear.",
    category: "Email Phishing",
    severity: "High",
    warning: "Don't click links or open attachments from unsolicited messages; navigate to accounts via saved bookmarks or typed URLs.",
    url: "https://consumer.ftc.gov/articles/how-recognize-avoid-phishing-scams",
    source: "FTC Consumer Advice"
  },
  {
    title: "Romance Scams: FTC Primer (2024 Update)",
    description: "Scammers build trust on dating sites or social media, then ask for money via gift cards, wire, or crypto. Losses are substantial and rising year to year.",
    category: "Romance Scam",
    severity: "High",
    warning: "Never send money or financial info to someone you haven't met; reverse-image search photos and verify identities.",
    url: "https://consumer.ftc.gov/articles/what-know-about-romance-scams",
    source: "FTC Consumer Advice"
  },
  {
    title: "Romance Scam Prevention Act Progress",
    description: "U.S. bill requires dating services to notify users if they interacted with banned accounts suspected of fraud. Enforcement by FTC and state AGs.",
    category: "Romance Scam",
    severity: "Medium",
    warning: "Turn on platform safety notifications; report suspicious profiles and avoid off-platform payments.",
    url: "https://www.congress.gov/bill/119th-congress/house-bill/2481",
    source: "Congress.gov"
  },
  {
    title: "Search-Result Hijack Scams for Help and Services (2025)",
    description: "Dishonest businesses buy ads or manipulate search results to intercept people seeking account recovery, tech help, or government services, then charge fees or steal info.",
    category: "Search Result Scam",
    severity: "Medium",
    warning: "Bypass search ads; go directly to official .gov or verified company support pages you enter yourself.",
    url: "https://consumer.ftc.gov/consumer-alerts/archive/202508",
    source: "FTC Consumer Alerts"
  }
];

const ScamAlerts = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      "Impersonation": "👮",
      "Delivery Scam": "📦",
      "Cryptocurrency Scam": "₿",
      "Email Phishing": "📧",
      "Social Media Scam": "📱",
      "Romance Scam": "💔",
      "Tech Support Scam": "💻"
    };
    return icons[category] || "⚠️";
  };

  const categories = ["All", ...Array.from(new Set(HARDCODED_SCAMS.map(s => s.category)))];
  const filteredScams = selectedCategory === "All" ? HARDCODED_SCAMS : HARDCODED_SCAMS.filter(s => s.category === selectedCategory);
  const stats = {
    total: HARDCODED_SCAMS.length,
    high: HARDCODED_SCAMS.filter(s => s.severity === "High").length,
    categories: categories.length - 1
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text">
          🚨 Current Scam Alerts
        </h2>
        <p className="text-gray-400 text-sm mt-1">Stay informed about common scams and fraud attempts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Alerts</p>
              <p className="text-3xl font-bold text-blue-400">{stats.total}</p>
            </div>
            <div className="text-4xl">🔔</div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-gradient-to-br from-red-900/30 to-red-800/20 border border-red-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">High Severity</p>
              <p className="text-3xl font-bold text-red-400">{stats.high}</p>
            </div>
            <div className="text-4xl">⚠️</div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Categories</p>
              <p className="text-3xl font-bold text-purple-400">{stats.categories}</p>
            </div>
            <div className="text-4xl">📊</div>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button key={category} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === category ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"}`}>
            {category !== "All" && getCategoryIcon(category)} {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredScams.map((scam, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className={`bg-gradient-to-br ${scam.severity === "High" ? "from-red-900/30 to-red-800/20 border-red-700/50" : "from-yellow-900/30 to-yellow-800/20 border-yellow-700/50"} border rounded-lg p-5`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getCategoryIcon(scam.category)}</span>
                <h3 className="font-bold text-white text-lg">{scam.title}</h3>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-semibold ${scam.severity === "High" ? "bg-red-600" : "bg-yellow-600"} text-white`}>{scam.severity}</span>
            </div>
            <div className="mb-3">
              <span className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-full">{scam.category}</span>
            </div>
            <p className="text-gray-300 text-sm mb-3">{scam.description}</p>
            <div className="bg-black/30 rounded-lg p-3 mb-3">
              <p className="text-yellow-400 text-xs font-semibold mb-1">⚠️ Safety Warning:</p>
              <p className="text-gray-300 text-xs">{scam.warning}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-xs">{scam.source}</p>
              <a
                href={scam.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1 transition-colors"
              >
                Read Article
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-700/50 rounded-lg p-6">
        <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
          <span>🛡️</span> General Safety Tips
        </h3>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li className="flex items-start gap-2"><span className="text-green-400">✓</span><span>Never share personal information, passwords, or verification codes</span></li>
          <li className="flex items-start gap-2"><span className="text-green-400">✓</span><span>Be suspicious of urgent requests for money or immediate action</span></li>
          <li className="flex items-start gap-2"><span className="text-green-400">✓</span><span>Verify requests through official channels you find yourself</span></li>
          <li className="flex items-start gap-2"><span className="text-green-400">✓</span><span>Enable two-factor authentication on all important accounts</span></li>
          <li className="flex items-start gap-2"><span className="text-green-400">✓</span><span>If something seems too good to be true, it probably is</span></li>
        </ul>
      </motion.div>
    </div>
  );
};

export default ScamAlerts;