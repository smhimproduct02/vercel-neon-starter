export interface Task {
    id: string;
    title: string;
    category: string;
    isCompleted: boolean;
    assignedTo: string | null;
    completedAt: string | null;
    orderNo: number;
    priority: 'High' | 'Medium' | 'Low';
    subtext?: string;
}

export interface Pillar {
    id: string;
    slug: string;
    title: string;
    team: string;
    color: 'emerald' | 'blue' | 'purple' | 'orange' | 'indigo';
    objective: string;
    categoryFilter: string; // Matches the category in Task
}

export const PILLARS: Pillar[] = [
    {
        id: '0',
        slug: 'setup-requirements',
        title: "Setup & Requirements",
        team: "MANAGEMENT",
        color: "indigo",
        objective: "Checklist persediaan sistem, tools, device dan role sebelum mula operasi.",
        categoryFilter: 'Setup & Requirements'
    },
    {
        id: '1',
        slug: 'database-device',
        title: "Database & Device Management",
        team: "AA & AMIR",
        color: "emerald",
        objective: "Pastikan semua database & device ready untuk follow-up, promo & after sales.",
        categoryFilter: 'Database & Device'
    },
    {
        id: '2',
        slug: 'product-stock',
        title: "Product & Stock Management",
        team: "PINUK & POKLOH",
        color: "blue",
        objective: "Merancang promosi yang meningkatkan conversion & repeat order.",
        categoryFilter: 'Product & Stock'
    },
    {
        id: '3',
        slug: 'flow-service',
        title: "Flow, Skrip & Service",
        team: "AIN, FATHIN, PINUK",
        color: "purple",
        objective: "Kawal keseluruhan pengalaman customer daripada beli - guna produk - repeat.",
        categoryFilter: 'Flow & Service'
    },
    {
        id: '4',
        slug: 'customer-order',
        title: "Customer Relation & Order",
        team: "AIDA, AISYAH, DELLY...",
        color: "orange",
        objective: "Monitor flow & submit order pelanggan.",
        categoryFilter: 'Customer & Order'
    },
];

export const MASTER_TASKS: Task[] = [
    // 0. Setup & Requirements (Pre-flight Checklist)
    { id: '001', orderNo: 1, category: 'Setup & Requirements', title: 'Sediakan 4 unit Android Phone (Min RAM 4GB)', isCompleted: true, assignedTo: 'Management', completedAt: '2025-12-01', priority: 'High' },
    { id: '002', orderNo: 2, category: 'Setup & Requirements', title: 'Beli 4 Simkad (Daftar atas nama syarikat)', isCompleted: true, assignedTo: 'Management', completedAt: '2025-12-01', priority: 'High' },
    { id: '003', orderNo: 3, category: 'Setup & Requirements', title: 'Install WSAPME App di semua device', isCompleted: true, assignedTo: 'Amir', completedAt: '2025-12-01', priority: 'High' },
    { id: '004', orderNo: 4, category: 'Setup & Requirements', title: 'Setup Office Wifi (Dedicated untuk CRM)', isCompleted: true, assignedTo: 'Management', completedAt: '2025-12-01', priority: 'Medium' },
    { id: '005', orderNo: 5, category: 'Setup & Requirements', title: 'Assign Role: Database Manager (1 Pax)', isCompleted: true, assignedTo: 'HR', completedAt: '2025-12-01', priority: 'High' },
    { id: '006', orderNo: 6, category: 'Setup & Requirements', title: 'Assign Role: Sales Team (3 Pax)', isCompleted: true, assignedTo: 'HR', completedAt: '2025-12-01', priority: 'High' },
    { id: '007', orderNo: 7, category: 'Setup & Requirements', title: 'Create Telegram Group: "CRM Reports"', isCompleted: false, assignedTo: 'Admin', completedAt: null, priority: 'Medium' },
    { id: '008', orderNo: 8, category: 'Setup & Requirements', title: 'Sediakan Google Sheet Master Database', isCompleted: false, assignedTo: 'Amir', completedAt: null, priority: 'High' },
    { id: '009', orderNo: 9, category: 'Setup & Requirements', title: 'Briefing SOP kepada semua team terlibat', isCompleted: false, assignedTo: 'Management', completedAt: null, priority: 'High' },

    // 1. Database & Device Management
    { id: '101', orderNo: 1, category: 'Database & Device', title: 'Verify WSAPME connection status (4 devices)', isCompleted: true, assignedTo: 'AA', completedAt: '2025-12-02', priority: 'High' },
    { id: '102', orderNo: 2, category: 'Database & Device', title: 'Check physical device battery (>80%) & internet', isCompleted: true, assignedTo: 'AA', completedAt: '2025-12-02', priority: 'High' },
    { id: '103', orderNo: 3, category: 'Database & Device', title: 'Export daily sales CSV from Ecommerce/Shopee', isCompleted: true, assignedTo: 'Amir', completedAt: '2025-12-02', priority: 'Medium' },
    { id: '104', orderNo: 4, category: 'Database & Device', title: 'Clean database (remove duplicates & format +60)', isCompleted: true, assignedTo: 'Amir', completedAt: '2025-12-02', priority: 'Medium' },
    { id: '105', orderNo: 5, category: 'Database & Device', title: 'Distribute leads to Main vs Backup devices', isCompleted: true, assignedTo: 'Amir', completedAt: '2025-12-02', priority: 'High' },
    { id: '106', orderNo: 6, category: 'Database & Device', title: 'Manual entry for TikTok leads', isCompleted: false, assignedTo: 'Amir', completedAt: null, priority: 'Medium' },
    { id: '107', orderNo: 7, category: 'Database & Device', title: 'Check SIM credit balance (Topup if <RM10)', isCompleted: false, assignedTo: 'AA', completedAt: null, priority: 'Low' },
    { id: '108', orderNo: 8, category: 'Database & Device', title: 'Perform SIM warming (Scroll FB/IG for 10 mins)', isCompleted: false, assignedTo: 'AA', completedAt: null, priority: 'Low' },
    { id: '109', orderNo: 9, category: 'Database & Device', title: 'Log daily new leads & device downtime', isCompleted: false, assignedTo: 'Amir', completedAt: null, priority: 'Medium' },

    // 2. Product & Stock Management
    { id: '201', orderNo: 10, category: 'Product & Stock', title: 'Pull daily sales report from Bizapp', isCompleted: true, assignedTo: 'Pinuk', completedAt: '2025-12-02', priority: 'High' },
    { id: '202', orderNo: 11, category: 'Product & Stock', title: 'Update inventory count in Master Sheet', isCompleted: true, assignedTo: 'Pinuk', completedAt: '2025-12-02', priority: 'High' },
    { id: '203', orderNo: 12, category: 'Product & Stock', title: 'Identify top 3 bestsellers & slow-moving items', isCompleted: true, assignedTo: 'Pokloh', completedAt: '2025-12-02', priority: 'Medium' },
    { id: '204', orderNo: 13, category: 'Product & Stock', title: 'Decide "Product of the Day" for push', isCompleted: true, assignedTo: 'Pokloh', completedAt: '2025-12-02', priority: 'High' },
    { id: '205', orderNo: 14, category: 'Product & Stock', title: 'Draft promo copy (Soft/Hard sell variations)', isCompleted: false, assignedTo: 'Pinuk', completedAt: null, priority: 'High' },
    { id: '206', orderNo: 15, category: 'Product & Stock', title: 'Determine offer structure (Bundle/Free Gift)', isCompleted: false, assignedTo: 'Pinuk', completedAt: null, priority: 'Medium' },
    { id: '207', orderNo: 16, category: 'Product & Stock', title: 'Update Promo Calendar for next 3 days', isCompleted: false, assignedTo: 'Pokloh', completedAt: null, priority: 'Medium' },
    { id: '208', orderNo: 17, category: 'Product & Stock', title: 'Analyze yesterday\'s promo conversion rate', isCompleted: false, assignedTo: 'Pinuk', completedAt: null, priority: 'Low' },

    // 3. Flow, Skrip & Service
    { id: '301', orderNo: 18, category: 'Flow & Service', title: 'Check WSAPME chatbot triggers & keywords', isCompleted: true, assignedTo: 'Ain', completedAt: '2025-12-02', priority: 'High' },
    { id: '302', orderNo: 19, category: 'Flow & Service', title: 'Test "Greeting" flow with dummy number', isCompleted: true, assignedTo: 'Ain', completedAt: '2025-12-02', priority: 'Medium' },
    { id: '303', orderNo: 20, category: 'Flow & Service', title: 'Submit poster request to Media Team', isCompleted: true, assignedTo: 'Fathin', completedAt: '2025-12-02', priority: 'Medium' },
    { id: '304', orderNo: 21, category: 'Flow & Service', title: 'Approve final visuals for broadcast', isCompleted: false, assignedTo: 'Fathin', completedAt: null, priority: 'Medium' },
    { id: '305', orderNo: 22, category: 'Flow & Service', title: 'Setup broadcast batch (Target: 60+ days inactive)', isCompleted: false, assignedTo: 'Pinuk', completedAt: null, priority: 'High' },
    { id: '306', orderNo: 23, category: 'Flow & Service', title: 'Monitor first 50 blasts for errors/bans', isCompleted: false, assignedTo: 'Pinuk', completedAt: null, priority: 'High' },
    { id: '307', orderNo: 24, category: 'Flow & Service', title: 'Calculate Reply Rate & Closing Rate', isCompleted: false, assignedTo: 'Ain', completedAt: null, priority: 'Medium' },
    { id: '308', orderNo: 25, category: 'Flow & Service', title: 'Update daily service report', isCompleted: false, assignedTo: 'Fathin', completedAt: null, priority: 'Low' },

    // 4. Customer Relation & Order
    { id: '401', orderNo: 26, category: 'Customer & Order', title: 'Verify payment receipts (Bank/QR)', isCompleted: true, assignedTo: 'Aida', completedAt: '2025-12-02', priority: 'High' },
    { id: '402', orderNo: 27, category: 'Customer & Order', title: 'Key in order details to Bizapp', isCompleted: true, assignedTo: 'Aida', completedAt: '2025-12-02', priority: 'High' },
    { id: '403', orderNo: 28, category: 'Customer & Order', title: 'Apply correct tagging (New/Repeat/Loyal)', isCompleted: true, assignedTo: 'Aida', completedAt: '2025-12-02', priority: 'Medium' },
    { id: '404', orderNo: 29, category: 'Customer & Order', title: 'Post payment proof to Telegram Group', isCompleted: true, assignedTo: 'Aisyah', completedAt: '2025-12-02', priority: 'Medium' },
    { id: '405', orderNo: 30, category: 'Customer & Order', title: 'Reply to customer inquiries (<10 mins)', isCompleted: false, assignedTo: 'Delly', completedAt: null, priority: 'High' },
    { id: '406', orderNo: 31, category: 'Customer & Order', title: 'Follow up on "Seen but No Reply" (24hrs)', isCompleted: false, assignedTo: 'Nazira', completedAt: null, priority: 'Medium' },
    { id: '407', orderNo: 32, category: 'Customer & Order', title: 'Report device lag/delay issues', isCompleted: false, assignedTo: 'Syamira', completedAt: null, priority: 'High' },
    { id: '408', orderNo: 33, category: 'Customer & Order', title: 'Update daily personal sales target', isCompleted: false, assignedTo: 'All', completedAt: null, priority: 'Low' },
];
