'use client';
import { usePublicApi } from '@/Hook/Api/Client/use-client';
import { objectAtomFamily } from '@/recoil/atom';
import { atomKey } from '@/recoil/atom-key';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import FooterLink from './FooterLink';
import FooterAccordian from './FooterAccordian';
import FooterTitle from './FooterTitle';
import SkeletonComponent from '../Skeleton/SkeletonComponent';
import GenericCTA from '../GenericCTA';

const Footer = () => {
  const { public_get_api } = usePublicApi();
  const [footerContent, setFooterContent] = useState([]);

  useEffect(() => {
    public_get_api({ path: 'cms/footers' }).then((res) => {
      if (res?.data && res?.success) {
        setFooterContent(res?.data ? res?.data.sort((a, b) => a.sort_order - b.sort_order) : []);
      }
    });
  }, []);
  const settings: any = useRecoilValue(objectAtomFamily(atomKey.settings));
  // @ts-ignore


  const bottomLinks: any[] = footerContent
    ?.filter((item: any) => item?.footer_type === 'bottom_links')
    ?.flatMap((item: any) => item.footer_value || []);

  const socialLinks: any[] = footerContent
    ?.filter((item: any) => item?.footer_type === 'social_links')
    ?.flatMap((item: any) => item.footer_value || []);

  // app stores
  const appStores = [
    {
      key: 'android',
      url: settings?.download?.app_android_link,
      imageUrl: '/svg/google-play.svg',
      altText: 'Get it on Google Play',
    },
    {
      key: 'ios',
      url: settings?.download?.app_ios_link,
      imageUrl: '/svg/app-store.svg',
      altText: 'Download on the App Store',
    },
  ];


  const AppLink = ({ url, imageUrl, altText }) => {
    if (!url) return null;

    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="inline-block">
        <Image height={80} width={240} src={imageUrl} alt={altText} className="max-h-8 sm:max-h-9 !w-auto" />
      </a>
    );
  };

  const RenderFooterContent = ({ item, index }) => {
    switch (item?.footer_type) {
      case 'about_us':
        return (
          <div className="col-span-12 md:col-span-3 space-y-4 mx-auto" key={index}>
            <Link href="/" className="logo-wrapper h-10 flex items-center w-fit">
              {!settings?.default?.logo ? (
                <SkeletonComponent count={1} className="max-sm:hidden h-10 w-20 rounded-full" />
              ) : (
                <Image
                  className="logo-img max-h-6 sm:max-h-10 !w-auto h-auto"
                  src={settings?.default?.logo}
                  alt="logo"
                  width={1000}
                  height={300}
                />
              )}
            </Link>
            <div className="text-footer_text space-y-2 text-sm">
              <div className="cms-info-box" dangerouslySetInnerHTML={{ __html: item?.footer_value?.about }}></div>
              {/* <p>{item?.footer_value?.copyright}</p> */}
              {/* <p>{item?.footer_value?.name}</p> */}
            </div>

            {socialLinks && socialLinks[0] && (
              <div className="space-y-[18px] w-fit">
                <div className="flex items-center gap-4 flex-wrap">
                  {Object.entries(socialLinks[0])
                    .filter(([key, value]) => value !== null)
                    .map(([key, value]: any) => (
                      <Link prefetch={false} key={key} href={value} className="text-gray-500 font-medium link " target="_blank">
                        <Image
                          src={`/images/${key}.png`}
                          className="w-[30px] h-[30px] hover:opacity-80 transition-ease"
                          alt="social-icons"
                          width={30}
                          height={30}
                        />
                      </Link>
                    ))}
                </div>
              </div>
            )}

            <div className="flex items-center flex-wrap gap-2">
              {appStores.map((store) => (
                <AppLink key={store.key} url={store.url} imageUrl={store.imageUrl} altText={store.altText} />
              ))}
            </div>
          </div>
        );
      case 'links':
        return (
          <div className="col-span-12 sm:col-span-4 md:col-span-3" key={index}>
            <FooterAccordian title={item?.title}>
              <ul className="space-y-2.5">
                {item?.footer_value &&
                  item?.footer_value.map((link, index) => (
                    <li key={index}>
                      <FooterLink name={link.label} url={link.url} target={link?.open_newtab ? '_blank' : '_self'} />
                    </li>
                  ))}
              </ul>
            </FooterAccordian>
            <div className="max-sm:hidden space-y-6 w-fit mx-auto">
              <FooterTitle title={item?.title} />
              <ul className="space-y-5">
                {item?.footer_value &&
                  item?.footer_value.map((link, index) => (
                    <li key={index}>
                      <FooterLink name={link.label} url={link.url} target={link?.open_newtab ? '_blank' : '_self'} />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        );
      default:
        return <></>;
    }
  };

  return (
    <footer
      className={`relative overflow-hidden bg-footer_bg pt-6 sm:pt-12 shadow-card rounded-t-2xl ${settings?.cta_bar?.cta_enabled && settings?.cta_bar?.cta_location == 'footer'
        ? 'pb-32 sm:pb-40 xl:pb-24'
        : 'pb-10 sm:pb-16'
        }`}
    >
      <div className="container">
        <div className="grid sm:grid-cols-12 gap-4 sm:gap-6">
          {footerContent?.length > 0 &&
            footerContent?.map((item, index) => <RenderFooterContent key={index} item={item} index={index} />)}
        </div>
        {settings?.default?.copyright ? (
          <div className="ftr_btm px-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 mt-[60px] pt-[15px] text-footer_text border-t border-footer_text/40">
            <p>{settings?.default?.copyright}</p>
            <div className="flex items-center gap-2">
              {bottomLinks?.map((item: any, index: number) => (
                <span key={index} className="flex items-center gap-2">
                  <FooterLink name={item.label} url={item?.url || '/'} target={item?.open_newtab ? '_blank' : '_self'} />
                  {index < bottomLinks.length - 1 && <span>|</span>}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <div className="max-xl:hidden fixed bottom-0 right-0 left-0">
        {settings?.cta_bar?.cta_enabled && settings?.cta_bar?.cta_location == 'footer' && <GenericCTA />}
      </div>

      {/* Background blur effects */}
      <div className="absolute inset-x-0 -bottom-60 lg:-bottom-180 bg-primary/40 h-80 w-80 lg:h-190 lg:w-190 mx-auto blur-[150px] rounded-full translate3d-0"></div>
    </footer>
  );
};

export default Footer;
