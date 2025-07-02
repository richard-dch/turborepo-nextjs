'use client';

import { Sidebar } from '@seeyou-eu/ui/components/navigation/sidebar';
import { useState } from 'react';
import { Home, Users, Calendar, BarChart3, Settings, Package, FileText, Mail, MessageSquare, Shield, Zap, Briefcase, Code2, Sparkles } from 'lucide-react';
import styles from './page.module.css';

export default function Dashboard() {
	const [demoExpanded, setDemoExpanded] = useState(false);

	const customSections = [
		{
			id: 'main',
			title: 'MAIN NAVIGATION',
			defaultExpanded: true,
			items: [
				{ id: 'dashboard', label: 'Dashboard', icon: <Home className="h-4 w-4" />, active: true },
				{ id: 'projects', label: 'Projects', icon: <Briefcase className="h-4 w-4" />, badge: '8' },
				{ id: 'messages', label: 'Messages', icon: <MessageSquare className="h-4 w-4" />, badge: '3' },
				{ id: 'team', label: 'Team Members', icon: <Users className="h-4 w-4" /> },
				{ id: 'calendar', label: 'Calendar', icon: <Calendar className="h-4 w-4" /> },
				{ id: 'analytics', label: 'Analytics', icon: <BarChart3 className="h-4 w-4" /> },
			],
		},
		{
			id: 'tools',
			title: 'TOOLS & FEATURES',
			defaultExpanded: true,
			items: [
				{ id: 'components', label: 'Components', icon: <Package className="h-4 w-4" /> },
				{ id: 'templates', label: 'Templates', icon: <FileText className="h-4 w-4" /> },
				{ id: 'ai-tools', label: 'AI Tools', icon: <Sparkles className="h-4 w-4" />, badge: 'PRO' },
				{ id: 'integrations', label: 'Integrations', icon: <Zap className="h-4 w-4" /> },
			],
		},
		{
			id: 'admin',
			title: 'ADMINISTRATION',
			collapsible: true,
			defaultExpanded: false,
			items: [
				{ id: 'settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
				{ id: 'security', label: 'Security', icon: <Shield className="h-4 w-4" /> },
				{ id: 'billing', label: 'Billing', icon: <Mail className="h-4 w-4" /> },
				{ id: 'api', label: 'API Access', icon: <Code2 className="h-4 w-4" /> },
			],
		},
	];

	return (
		<div className="flex">
			<Sidebar
				sections={customSections}
				user={{
					name: 'Richard',
					email: 'richard@seeyou.eu',
				}}
				variant={'expanded'}
				theme={'dark'}
				defaultExpanded={demoExpanded}
				onExpandedChange={setDemoExpanded}
				workspaceName="SEEYOU ADMIN"></Sidebar>

			<div>SEEYOU Admin Dashboard</div>
		</div>
	);
}
