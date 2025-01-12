"use client"

import React from 'react';
import { usePathname } from 'next/navigation';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink } from './ui/breadcrumb';

const BreadcrumbHeader = () => {
    const pathName = usePathname();
    const paths = pathName === '/' ? [''] : pathName.split('/');
    return (
        <div className="flex items-center flex-start">
            <Breadcrumb>
                <BreadcrumbList>
                    {paths.map((path, index) => (
                        <React.Fragment key={index}>
                            <BreadcrumbItem>
                                <BreadcrumbLink className="capitalize" href={`/${path}`}>
                                    {path === "" ? "home" : path}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </React.Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}

export default BreadcrumbHeader;
